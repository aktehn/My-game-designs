//stick variable 
var leftStick = document.getElementById('leftStick');
var rightStick = document.getElementById('rightStick');

//ball variable
var ball = document.getElementById('ball');
var ballTop = 2; // veya -2
var ballLeft = 2; // veya -2
var gameSpeed = 10;

//score variable
var leftScore = 0;
var rightScore = 0;

//innerHeight : Web sayfasının penceredeki görünen yüksekliğini verir.
//burada sticklerimizi oyun ekranımızın ortasına getirdik.
leftStick.style.top = window.innerHeight/2 +'px';
rightStick.style.top = window.innerHeight/2 +'px';

ball.style.top= window.innerHeight/2 +'px';
ball.style.left = (window.innerWidth/2) - (16/2) +'px';

//stickin style top değerini artırırken px değer olduğu için bu fonksiyona değeri gönderip px halini geri döndürmeliyiz
function pxAdd(numb){
    return numb + 'px';
  }
function gameAgain(){
 ball.style.top = window.innerHeight/2 + 'px';
 ball.style.left = (window.innerWidth/2) - (16/2) + 'px';
 var rnd = Math.random()*3+2;

	if(Math.random()*1 > 0.5){
		rnd *= -1;		
	}

	ballLeft = rnd;
	ballTop = rnd;
}


//klavyeden değer almak için onkey fonksiyonunu kullanırız.Basılan tuşların keycode değerine göre işlem yaparız.
document.onkeydown=function(e){
    switch(e.keyCode){
         //çubuğun o anki top değerini alırız bu değer px değeridir sonra onu integere çeviririz +- değer vermek için
         //değer verdikten sonra bunu fonksiyona yollayıp px halini geri döndürürüz bunu yeni top değerine eşitleriz.
        case 87:
            if(parseInt(leftStick.style.top)<=30){
                leftStick.style.top = leftStick.style.top;
            }else{
                leftStick.style.top = pxAdd(parseInt(leftStick.style.top)-30);// w tuşuna basıldığında 30px yukarı çık
            } 
            break;
        case 83:
            if(parseInt(leftStick.style.top) +85>= innerHeight){
                leftStick.style.top=leftStick.style.top;
            }
            else{
                leftStick.style.top = pxAdd(parseInt(leftStick.style.top)+30);//s tuşuna basıldığında 30px aşağıya in
            }
            break;
        case 38://sağ çubuk
            if(parseInt(rightStick.style.top)<=30){
                rightStick.style.top=rightStick.style.top;
            }
            else{
                rightStick.style.top = pxAdd(parseInt(rightStick.style.top)-30);//yukarı ok tuşuna basıldığında 30px yukarı çık
            }
            break;
        case 40:
            if(parseInt(rightStick.style.top)+85>=innerHeight){
                rightStick.style.top=rightStick.style.top;
            }
            else{
                rightStick.style.top = pxAdd(parseInt(rightStick.style.top)+30);
            }  
            break;
            default:
    }

}
//sürekli çalışır.
  function gameLoop(){
    // topun alacağı değerler Her saniyede top ve left değerlerine +2 değer alır.
    ball.style.top = pxAdd(parseInt(ball.style.top) + ballTop);
    ball.style.left = pxAdd(parseInt(ball.style.left) + ballLeft);

    // top üst ve alt bloklara çarparsa, X ekseninde geri seksin
	if(parseInt(ball.style.top) <= 0 || parseInt(ball.style.top) + 16 >= window.innerHeight){
		ballTop *= -1;
    }
    
    // top sağ ve sol çubuklara çarparsa, Y ekseninde geri seksin
	if(parseInt(ball.style.left) <= 0 + 16 && parseInt(ball.style.top)  >= parseInt(leftStick.style.top) && parseInt(ball.style.top) <= parseInt(leftStick.style.top) + 85){
		ballLeft *= -1;
	}else if(parseInt(ball.style.left) + 16 >= window.innerWidth - 12 && parseInt(ball.style.top) >= parseInt(rightStick.style.top) && parseInt(ball.style.top) <= parseInt(rightStick.style.top) + 85){
		ballLeft *= -1;		
    }
    // topun left konumu 0ın altına düşerse sol taraftan çıkarsa sağ tarafa puan yaz
    if(parseInt(ball.style.left)<=0){
        if(++rightScore === 5){
			alert('2. oyuncu kazandı.');
			rightScore = 0;
			leftScore = 0;
			document.getElementById('leftScore').innerHTML = leftScore;
		}
		document.getElementById('rightScore').innerHTML = rightScore;
		gameAgain();
    }
    //topun sol konumu + 16(kendi boyutu) ekranın genişliğini geçerse sol tarafa puan yaz 
    if(parseInt(ball.style.left) +16 >= window.innerWidth){
        if(++leftScore === 5){
			alert('1. oyuncu kazandı.');
			rightScore = 0;
			leftScore= 0;
			document.getElementById('rightScore').innerHTML = rightScore;
		}
		document.getElementById('leftScore').innerHTML = leftScore;
		gameAgain();
	}
}   

    
    
  setInterval(gameLoop,gameSpeed);