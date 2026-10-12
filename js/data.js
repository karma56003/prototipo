export const seed={
 users:[
  {id:'u-admin',name:'Equipo MesaVista',email:'admin@mesavista.demo',password:'Demo1234!',role:'admin'},
  {id:'u-rest',name:'Carla Méndez',email:'restaurante@mesavista.demo',password:'Demo1234!',role:'restaurant',restaurantId:'rest-1'},
  {id:'u-client',name:'Alex García',email:'cliente@mesavista.demo',password:'Demo1234!',role:'customer'}
 ],
 restaurants:[{id:'rest-1',name:'Sabor Local',type:'Hamburguesería',city:'Tarija',description:'Hamburguesas, pizzas y postres hechos con cariño.',phone:'',plan:'Profesional',active:true,contact:'Carla Méndez',email:'restaurante@mesavista.demo'},
 {id:'rest-2',name:'Café Aurora',type:'Cafetería',city:'Tarija',description:'Un espacio acogedor para disfrutar de café y postres.',phone:'',plan:'Básico',active:true,contact:'Administrador',email:'info@cafeaurora.demo'}],
 products:[
  {id:'p-1',restaurantId:'rest-1',name:'Hamburguesa clásica',category:'Hamburguesas',price:35,description:'Carne a la parrilla, queso, lechuga y tomate.',ingredients:'Pan, carne, queso, lechuga, tomate',image:'assets/img/burger.svg',model:'assets/models/burger.glb',available:true,featured:true},
  {id:'p-2',restaurantId:'rest-1',name:'Pizza margarita',category:'Pizzas',price:49,description:'Masa artesanal, mozzarella, tomate y albahaca.',ingredients:'Harina, tomate, mozzarella, albahaca',image:'assets/img/pizza.svg',model:'assets/models/pizza.glb',available:true,featured:true},
  {id:'p-3',restaurantId:'rest-1',name:'Cupcake de vainilla',category:'Postres',price:22,description:'Bizcocho suave con crema y una cereza.',ingredients:'Harina, leche, huevos, vainilla',image:'assets/img/cupcake.svg',model:'assets/models/cupcake.glb',available:true,featured:false},
  {id:'p-4',restaurantId:'rest-1',name:'Hamburguesa doble',category:'Hamburguesas',price:45,description:'Dos carnes a la parrilla con doble queso.',ingredients:'Pan, carne, queso, verduras',image:'assets/img/burger.svg',model:'assets/models/burger.glb',available:true,featured:false},
  {id:'p-5',restaurantId:'rest-1',name:'Pizza especial',category:'Pizzas',price:58,description:'Pizza generosa con vegetales y queso gratinado.',ingredients:'Masa, mozzarella, pimiento, champiñones',image:'assets/img/pizza.svg',model:'assets/models/pizza.glb',available:true,featured:false},
  {id:'p-6',restaurantId:'rest-1',name:'Limonada de la casa',category:'Bebidas',price:14,description:'Limonada fresca ideal para acompañar tu plato.',ingredients:'Agua, limón, azúcar',image:'assets/img/drink.svg',model:'',available:true,featured:false},
  {id:'p-7',restaurantId:'rest-2',name:'Cupcake especial',category:'Postres',price:25,description:'Postre artesanal con crema.',ingredients:'Harina, azúcar, mantequilla',image:'assets/img/cupcake.svg',model:'assets/models/cupcake.glb',available:true,featured:true},
  {id:'p-8',restaurantId:'rest-2',name:'Limonada natural',category:'Bebidas',price:15,description:'Bebida fresca preparada al momento.',ingredients:'Limón, agua',image:'assets/img/drink.svg',model:'',available:true,featured:true}
 ],
 beta:[], orders:[],favorites:[], inquiries:[]
};
