(() => {
    let numbers = [];
    for (let i = 1; i <=8; i+=1) { //создаем массив попарных чисел numbers
        numbers.push(i);
        numbers.push(i);
    }

    const shuffle = (array) => {
        let m = array.length, t, i; 
        while (m) {
          i = Math.floor(Math.random() * m--);
          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }   
        return array;
    }

    let randomNumbers = shuffle(numbers);  //создаем массив перемешанных чисел randomNumbers
    
    let i = 0;
    function deleteNumber(){ //функция для заполнения карточек числами из массива
        let item = randomNumbers[i];
        i++;
        return item;
    }

    let arrayCards = []
    let openedCards = [];
    const container = document.querySelector('.container')
    let openedCardsCount = [];

    for (let i = 1; i <=16; i+=1) {
        let card = document.createElement('div');      
        card.classList.add('card');
        card.textContent = '';  
           
        let item = {cardItem: card, cardNumber:deleteNumber()}
        arrayCards.push(item);
        
        container.append(item.cardItem); 

        function createCard(){
            card.textContent = `${item.cardNumber}`; 
            openedCards.push(item);
            
            if(openedCards.length === 2){
                function clearValue(card1, card2){
                    card1.textContent = '';
                    card2.textContent = '';
                }

                if(openedCards[0].cardNumber !== openedCards[1].cardNumber){
                    setTimeout(clearValue, 700, openedCards[0].cardItem, openedCards[1].cardItem);                  
                }
                else{
                    openedCards[0].cardItem.textContent = `${item.cardNumber}`;
                    openedCards[1].cardItem.textContent = `${item.cardNumber}`;
                    
                    openedCardsCount.push(openedCards[0]);  
                    openedCardsCount.push(openedCards[1]);
    
                    for(let e of openedCardsCount){
                        e.cardItem.removeEventListener('click', createCard);
                    }                          
                }
                openedCards = [];
            }
    
            if(openedCardsCount.length === 16){
                const button = document.createElement('button');
                function windowReload(){ 
                    window.location.reload()
                }
                button.addEventListener('click', windowReload);
                container.append(button);
                button.classList.add('bth');
                button.textContent = "Сыграть ещё раз";      
            }
        }

        if(openedCards.length < 2){
            card.addEventListener('click', createCard);   
        }            
    } 
})();


