import {
	getModelForClass,
	modelOptions,
	prop,
	Severity,
	pre,
	DocumentType,
} from "@typegoose/typegoose";
import { nanoid } from "nanoid";
import argon2 from "argon2";
import log from "src/utils/logger";

@pre<User>("save", async function () {
	if (!this.isModified("password")) {
		return;
	}

	const hash = await argon2.hash(this.password);

	this.password = hash;

	return;
})
@modelOptions({
	schemaOptions: {
		timestamps: true,
	},
	options: {
		allowMixed: Severity.ALLOW,
	},
})
export class User {
	@prop({ required: true, unique: true })
	email: string;

	@prop({ required: true, unique: true })
	walletAddress: string;

	@prop({ required: true })
	password: string;

	@prop({ required: true, default: () => nanoid() })
	verificationCode: string;

	@prop()
	passwordResetCode: string | null;

	@prop({ default: false })
	verified: boolean;

	async validatePassword(this: DocumentType<User>, candidatePassword: string) {
		try {
			return await argon2.verify(this.password, candidatePassword);
		} catch (e) {
			log.error(e, "Password not validated");
			return false;
		}
	}
}

const UserModel = getModelForClass(User);

export default UserModel;
