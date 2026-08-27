import AsyncStorage from "@react-native-async-storage/async-storage";
import { err, ok, type Result } from "../types/Result";

export class UserAgentService {
    private constructor() { }

    private static isValidEmail(value: string): boolean {
        const emailRegex: RegExp = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
    }

    static async saveUserAgent(email: string): Promise<Result<boolean, string>> {
        console.info("UserAgentService.saveUserAgent called");

        try {
            if (!this.isValidEmail(email)) {
                console.error("UserAgentService.saveUserAgent => invalid e-mail")
                return err("Falha ao salvar User Agent, E-mail inválido.");
            }

            await AsyncStorage.setItem("current-userAgent", email.trim());

            return ok(true);
        } catch {
            console.error("UserAgentService.saveUserAgent => failed to save user-agent")
            return err("Falha ao salvar User Agent.");
        }
    }

    static async getSavedUserAgent(): Promise<Result<string, string>> {
        console.info("UserAgentService.getSavedUserAgent called");

        try {
            const value = await AsyncStorage.getItem("current-userAgent");
            if (!value) {
                console.warn(`UserAgentService.getSavedUserAgent => undefined user-agent`);
                return err(`Falha ao recuperar User Agent salvo, User Agent não definido`);
            }

            return ok(value);
        } catch {
            console.warn(`UserAgentService.getSavedUserAgent => failed to retrieve saved user-agent`);
            return err(`Falha ao recuperar User Agent salvo.`);
        }
    }
}