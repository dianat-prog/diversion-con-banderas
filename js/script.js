const divCountriesList =document.getElementById('countries-list');


const getflag= async ()=>{
    try{
        const response=await fetch('https://restcountries.com/v3/all');
        if (!response.ok){
            throw new Error ('Ha surgido un error', response.status);
        }
        const flags =await response.json();
        return flags;
    }catch(error){
        console.log('Error al obtener los datos', error)
    }
};


const paintFlags =(flags)=>{
    
  //Creamos un elemnto ul
  const elementUl =document.createElement('ul');

  //creamos un array con las banderas ordenadas alfabeticamente
    const sortFlags= flags.sort((a, b) => {
      if (a.name.common > b.name.common) return 1;
      if (a.name.common < b.name.common) return -1;
    
      // Si los nombres también son iguales, comparar por edad (numérico)
      return 0;
    });
  

    sortFlags.forEach(flag => {

      const elementLi =document.createElement('li');
      elementLi.classList.add('elementLi');


      const divContainer =document.createElement('div');
      divContainer.classList.add('divContainer');

      const divImg =document.createElement('div');
      divImg.classList.add('divImg');

      const imgFlag =document.createElement('img');
      imgFlag.classList.add('imgFlag');
      imgFlag.src=flag.flags[0];

      

      //Añadimos la imagen al div que contien la imagen
      divImg.appendChild(imgFlag);
      divContainer.appendChild(divImg);


      //Creamos el texto 
      const divText =document.createElement('div');
      divText.classList.add('divText');
      const elementH3 =document.createElement('h3');
      elementH3.textContent=flag.name.common
      divText.appendChild(elementH3)
      divContainer.appendChild(divText);

      //Ahora añadimos el divCOntainer al elemento li
      elementLi.appendChild(divContainer);
   

      //ventana flotante
      const divPop =document.createElement('div');
      divPop.classList.add('divPop');

      const divContainePop =document.createElement('div');
      divContainePop.classList.add('divContainer-pop');

      const divImgPop =document.createElement('div');
      divImgPop.classList.add('divImg-pop');

      const imgFlagPop =document.createElement('img');
      imgFlagPop.classList.add('imgFlagPop');
      imgFlagPop.src=flag.flags[0];

      divImgPop.appendChild(imgFlagPop);
      divContainePop.appendChild(divImgPop);

      const divInfPop =document.createElement('div');
      divInfPop.classList.add('divInf-pop');
      let info=`<h3>${flag.name.common}</h3><p>Capital: ${flag.capital}</p>`;
      info+=`<p>Población: ${flag.population}</p><p>Lado de la carretera: ${flag.car.side}</p>`
      divInfPop.innerHTML= info;
      divContainePop.appendChild(divInfPop);
      
      const btnClose =document.createElement('button');
      btnClose.id='btnClose';
      btnClose.value='Cerrar';
      btnClose.textContent='Cerrar';
     

      //evento clikc boton cerrar de la ventana flotante
      btnClose.addEventListener('click', ()=>{
        divPop.style.display='none';
      })

      //clik sobre la imagen
      imgFlag.addEventListener('click', ()=>{
       
        divPop.style.display='block';
    })
    
    divPop.appendChild(divContainePop);
    divPop.appendChild(btnClose)

    elementLi.appendChild(divPop);
    elementUl.appendChild(elementLi);

      
    });

    divCountriesList.appendChild(elementUl);
   
};

getflag().then((flags)=> paintFlags(flags));

