import data from '../data.js'
import axios from 'axios'
 function getPrice(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function geCompany() {
    const company = ['Kenya Wine Agencies ltd','Drostdy Hof','Four Cousins','Nairobi Drinks','London Distillers (K) Ltd- Nairobi','Robertson Winery Rose Cover','WOW Beverages','Swam Wines Ltd','Cellar Cask','Fystar Wines And Spirits Limited','Nederburg','Altar wine','Nairobi Vintners Kenya Ltd','Swam Wines Ltd','Fystar Wines And Spirits Limited','Viva Global Ltd']
  const index =  Math.floor(Math.random() * (company.length) );
  return company[index];
}
function getSize() {
    const size = ['2 PC','3 PC' ,'4 PC' ,'medium','small','1 pc']
  const index =  Math.floor(Math.random() * (size.length) );
  return size[index];
}
function getIngridients(element) {
    const ingredientes = []
        for(let key in element){
            if(key.startsWith('strIngredient')){
                if(element[key]){
                    ingredientes.push(element[key])

                }
            }
    };

    return ingredientes;

}
export function formatWines() {
 const tempData = data.map(item => {
        const {strCategory,strAlcoholic,strGlass,strInstructions,strDrinkThumb,strDrink} = item;
        const ingredientes = getIngridients(item);
        let price = getPrice(150,350);
        let company = geCompany();
        let size = getSize();
        return {ingredients:ingredientes,size, price,company,categories:[strCategory,'wine','spirit','drink'],isAcoholic:strAlcoholic,glass:strGlass,instructions:strInstructions,image:strDrinkThumb,name:strDrink}
    });
    return tempData;

}
export async function getPizza(){
const options = {
  method: 'GET',
  url: 'https://pizza-and-desserts.p.rapidapi.com/desserts',
  headers: {
    'X-RapidAPI-Key': 'a012475824mshd059d665d653431p1c9520jsn2e918881c042',
    'X-RapidAPI-Host': 'pizza-and-desserts.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
    const data = response.data.map(item =>{
        let  {img,description,name} = item;
        const ingredients = [];
        const price  = getPrice(450,700)
        let size = getSize();
        // const ingridients= ingredients.map(item => {
        //     const {name} = item;
        //     return name;
        // })
        return ({image:img,description,price,name,size,categories:['desserts','food','snack','refreshment'], ingridients:ingredients})

    })
	return data
    // return response.data
} catch (error) {
	console.error(error);
}
}