// -----------------------------------------------------this-------------------------------------------------------------

//1.Создать объект, который описывает ширину и высоту прямоугольника, а также может посчитать площадь фигуры:

const rectangle = {
  width: 4,
  height: 5,
  getSquare: function() {
    return this.width * this.height;
  }
};
console.log(rectangle.getSquare());

//2.Создать объект, у которого будет цена товара и его скидка, а также два метода: для получения цены и для расчета цены с учетом скидки:

const price = {
  price: 10,
  discount: "15%",
  getPrice: function() {
    return this.price;
  },
  getPriceWithDiscount: function() {
    return this.price - (this.price * parseInt(this.discount)) / 100;
  }
};
console.log(price.getPrice()); // 10
console.log(price.getPriceWithDiscount()); // 8.5

//3.Создать объект, у которого будет поле высота и метод “увеличить высоту на один”. Метод должен возвращать новую высоту: object.height = 10; object.inc(); // придумать свое название для метода object.height; // 11;

const object = {
  height: 10,
  heightPlusOne: function() {
    return this.height + 1;
  }
};
console.log(object.heightPlusOne());

//4. Создать объект “вычислитель”, у которого есть числовое свойство “значение” и методы “удвоить”, “прибавить один”, “отнять один”. Методы можно вызывать через точку, образуя цепочку методов:

const numerator = {
  value: 1,
  double: function() {
    this.value *= 2;
    return this;
  },
  plusOne: function() {
    this.value += 1;
    return this;
  },
  minusOne: function() {
    this.value -= 1;
    return this;
  }
};
console.log(
  numerator
    .double()
    .plusOne()
    .plusOne()
    .minusOne()
);
console.log(numerator.value); // 3

//5. Создать объект с розничной ценой и количеством продуктов. Этот объект должен содержать метод для получения общей стоимости всех товаров (цена * количество продуктов)

const products = {
  retailPrice: 1,
  quantity: 2,
  totalCost: function() {
    return this.retailPrice * this.quantity;
  }
};
console.log(products.totalCost());

//6. Создать объект из предыдущей задачи. Создать второй объект,который описывает количество деталей и цену за одну деталь. Для второго объекта нужно узнать общую стоимость всех деталей, но нельзя создавать новые функции и методы. Для этого “позаимствуйте” метод из предыдущего объекта.

const products2 = {
  retailPrice: 3,
  quantity: 4,
  totalCost2: function() {
    return this.retailPrice * this.quantity;
  }
};
console.log(products2.totalCost2());
const details = {
  retailPrice: 7,
  quantity: 3
};
console.log(products2.totalCost2.call(details));

//7. Даны объект и функция:Не изменяя функцию или объект, получить результат функции getSquare для объекта sizes
let sizes = { width: 5, height: 10 },
  getSquare = function() {
    return this.width * this.height;
  };
console.log(getSquare.call(sizes));

//8. Измените функцию getElementHeight таким образом, чтобы можно было вызвать getElementHeight() и получить 25.

let element = {
  height: 25,
  getHeight: function() {
    return this.height;
  }
};
let getElementHeight = element.getHeight.bind(element);
console.log(getElementHeight());

//-----------------------------------------------Функции стрелки---------------------------------------------------------

//1.Переделать функцию с использованием функции-стрелки (в методе reduce тоже использовать arrow function):

const sum = (...params) => {
  Array.prototype.slice.call(sum);
  if (!params.length) return 0;
  return params.reduce((prev, next) => prev + next);
};
console.log(sum(1, 2, 3, 4)); // 10
console.log(sum()); // 0

//--------------------------------------------Деструктурирующее присваивание---------------------------------------------

//1.Используя rest оператор и деструктуризацию, создать функцию, которая принимает любое количество аргументов и возвращает объект, содержащий первый аргумент и массив из остатка:

function getBaseInfo(first, ...other) {
  return `First:${first}; Other:[${other}]`;
}
console.log(getBaseInfo("a", "b", "c", "d"));

//2. Организовать функцию getInfo, которая принимает объект вида{ name: ...,  info: { employees: [...], partners: [ … ]  } }и выводит в консоль имя (если имени нет, показывать ‘Unknown’) и первые две компании из массива partners:
const organisation = {
  name: "Google",
  info: {
    employees: ["Vlad", "Olga"],
    partners: ["Microsoft", "Facebook", "Xing"]
  }
};
function getInfo({ name, info: { partners } }) {
  if (name.length > 0) {
    return `Name:${name};
Partners:${partners[0]},${partners[1]}`;
  } else {
    return `Name:Unknown;
Partners:${partners[0]},${partners[1]}`;
  }
}
console.log(getInfo(organisation));
//Name: Google
//Partners: Microsoft Facebook
