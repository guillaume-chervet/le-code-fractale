

class ArticleService {    
    constructor(articlePrice, articleStock){
        this._articlePrice = articlePrice;
        this._articleStock = articleStock;
    }
    GetArticle(id)  {
        const getPriceResult = this._articlePrice.GetPrice(id);  
        let getStockResult = null
        try{  
            getStockResult = this._articleStock.GetStock(id);
        } catch (exception){
            console.log(exception)
            getStockResult = { Stock: 4 };
        }
        const stock = getStockResult.Stock;
        let newPrice = getPriceResult.Price;
        if(newPrice > 0){
            if(stock <= 5){
                    newPrice = newPrice + (newPrice/2);
            } else if(stock <= 10){
                newPrice = newPrice + (newPrice/4);
            }
        }
        
        const article = {id, stock, newPrice};
        return article;
    }
}

const articlePriceMock = { GetPrice : () => {return { Price: 3}} };
const articleStockMock = { GetStock : () => {return { Stock: 45}} };

console.log("article ", new ArticleService(articlePriceMock, articleStockMock).GetArticle("12") );

//const articleStockMockError = { GetStock : () => { throw new "Mainframe HS"} };
//console.log("article avec stock en erreur", new ArticleService(articlePriceMock, articleStockMockError).GetArticle("12") );
