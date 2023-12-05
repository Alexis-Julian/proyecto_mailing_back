import "reflect-metadata";

export const a = 1;
/* type Task = {
	name: string;
	level: "low" | "medium" | "complicated";
};

class Manager {
	@withComplicatedTask
	tasks: any[] = [1];
}

const manager = new Manager();
console.log(manager);

function withComplicatedTask<T, V extends Task[]>(
	_target: undefined,
	_context: ClassFieldDecoratorContext<T, V>
) {
	return function (args: V) {
		console.log("se recuperoooo!!", args);
		return args;
	};
} */

function test(_target: any, _context: any) {
	console.log("Se renderizo");

	return function (args: any) {
		console.log("se recuperoooo", args);
		return args;
	};
}

function withEmploymentDate<T extends { new (...args: any[]): {} }>(
	baseClass: T,
	_context: any
) {
	const abs = new baseClass();
	console.log(abs);
	console.log("Invoking decorator!!!");
	const decoradores = Reflect.getMetadata("decoreadores", baseClass) || [];
	console.log(decoradores);
	return class extends baseClass {
		employmentDate = new Date().toISOString();
		constructor(...args: any[]) {
			super(...args);
			console.log("Adding employment date to " + baseClass.name);
		}
	};
}

@withEmploymentDate
class Persona {
	email: string | undefined;
	password: string | undefined;
}
const user: Persona = { email: "probando", password: "1" };
user;

/* const userDto = new Persona();
userDto */

/* const probando = new Persona();
probando.email = "1"; */

/* const abc = new Persona();
console.log(abc); */
/* new Persona(); */

function getName(this: any) {
	try {
		console.log(`Mi nombre es ${this.nick}`);
	} catch {
		console.log("Hubo un error");
	}
}
getName();

const midudev = {
	nick: "PRBOANDO",
	getName: getName,
};
midudev.getName();
