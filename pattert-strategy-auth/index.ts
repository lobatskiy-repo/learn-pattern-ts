interface Strategy {
    authenticate(args: any[]): boolean
}

class TwitterStrategy implements Strategy {
    authenticate(args: any[]) {
        const [token] = args;

        if (token !== 'tw123') {
            console.error('Аутентификация с помощью аккаунта Twitter провалилась')
            return false
        }

        console.log('Аутентификация с помощью аккаунта Twitter выполнена успешно!')
        return true
    }
}
class LocalStrategy implements Strategy {
    authenticate(args: any[]) {
        const [username, password] = args;

        if (username !== "bytefer" && password !== "666") {
            console.log("Неправильное имя пользователя или пароль!");
            return false;
        }

        console.log("Аутентификация с помощью логина и пароля выполнена успешно!");
        return true;
    }
}

class Authenticator {
    strategies: Record<string, Strategy>

    use(name: string, strategy: Strategy) {
        this.strategies[name] = strategy;
    }

    authenticate(name: string, ...args: any) {
        if (!this.strategies[name]) {
            console.error("Политика аутентификации не установлена!");
            return false;
        }

        return this.strategies[name].authenticate.apply(null, args)
    }
}

const auth = new Authenticator();

auth.use('twitter', new TwitterStrategy())
auth.use('local', new LocalStrategy())

function login(mode: string, ...args: any) {
    return auth.authenticate(mode, args)
}

login('twitter', '123');
login("local", "bytefer", "666");
