export const a = 1;

function probnado(value: any, context: any) {
	console.log(context);
	return class extends value {
		constructor(...args: any) {
			super(args);
			this.email = "se cambio";
		}
	};
}

class Validator {}

@probnado
class Developer {
	email?: string;
}
const probando = { email: "oaaa" };
const ashe = new Developer();
console.log(ashe);

function test2(value: any, context: any) {
	console.log(value, context);
}

//esta tendria que ser la que crea el usuario y manipular en la test2
@test2
class test1 {
	password?: string;
	email?: string;
}

/* class test2 extends test1 {
	constructor() {
		super();
		this.password = "1";

		console.log("ESTO NO SE EJECUTA HASTA QUE SE LLAMA");
	}
}
const aasd = new test2();
console.log(aasd.password); */

console.log(new test1().password);

/* function probando(_value: any, target: any) {
	const configuracion = target.access;

	Usa las funciones según sea necesario
		const tiene = configuracion.has();
	const valor = configuracion.get();
} */

/* const sexo = { campo: "Ella me pide sexo" };

function klass(value: any, _context: any) {
	return class extends value {
		constructor(...args: any) {
			super(...args);
			this.campo = "1";
			console.log(this);
		}
	};
}

@klass
class Probando {
	campo: string;
}
new Probando(); */

// A lo mejor la logica de todo es rescatar los campos y en la nueva instancia sumarle las cosas al constructor gracias a los datos que ya estan en las clases
// y validarlos

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

/* function test(_target: any, _context: any) {
	console.log("Se renderizo");

	return function (args: any) {
		console.log("se recuperoooo", args);
		return args;
	};
} */

/* function withEmploymentDate<T extends { new (...args: any[]): {} }>(
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
} */
/* 
@withEmploymentDate
class Persona {
	email: string | undefined;
	password: string | undefined;
}
const user: Persona = { email: "probando", password: "1" };
user; */

/* const userDto = new Persona();
userDto */

/* const probando = new Persona();
probando.email = "1"; */

/* const abc = new Persona();
console.log(abc); */
/* new Persona(); */

/* function getName(this: any) {
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
 */
