class Food{
    constructor(){
        this.image = loadImage('images/Milk.png');
        this.foodStock = 0;
        this.lastFed = 0;
    }

    getFoodStock(foodStock){
        this.foodStock = foodStock;
        
    }
    updateFoodStock(num){
        database.ref('/').update({
            Food: this.foodStock + num
        })
    }

    display(){
        //console.log("display");
        if(this.foodStock === 0){
            clear();
        }
        else if(this.foodStock>0 && this.foodStock !== undefined){
            var xPosition = 15;
            var yPosition = 100;
            //console.log(this.foodStock);
            clear();
            for(var i=0; i<this.foodStock; i++){
                image(this.image,xPosition,yPosition,40,40);
                xPosition+=30;
                if(i%10 === 0 && i>0){
                    yPosition += 50;
                }
            }
        }
    }
}