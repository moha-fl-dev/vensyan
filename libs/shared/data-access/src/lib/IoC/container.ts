import { container } from "tsyringe";
import { AuthService } from '../services';
import { OnboardingService } from "../services/onboarding";

container.register<OnboardingService>(OnboardingService, {
    useClass: OnboardingService
})

container.register<AuthService>(AuthService, {
    useClass: AuthService
})



export {
    container
};

