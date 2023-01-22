import { injectable } from "tsyringe";

@injectable()
export class GreetingService {

    constructor(private client: ClientService) { }

    async sayHello() {


        return 'hello world'
    }

    sayGoodbye(name: string) {
        return `Goodbye ${name}!`;
    }
}