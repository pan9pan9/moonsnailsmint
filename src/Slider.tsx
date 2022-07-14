import React from 'react';
import {useState, useEffect, useRef} from 'react';
import styled from "styled-components";

const itemSize : number = 550;
type IntervalFunction = () => ( unknown | void )

const Image = styled.img`
  height: ${itemSize}px;
  width: ${itemSize}px;
`;

const SliderContainer = styled.div`
  position: relative;
  width: ${itemSize}px;
  height: ${itemSize}px;
  overflow: hidden;
`;

// const SlideBox = styled.div`
//   transform: translateX(${(-1)*(itemSize*currentIndex)}px); 
//   transitionDuration: 0.2s;
// `;

const ImgBox =styled.div`
position: absolute; 
left: 0;
display: flex;
`;
const ShadowBox= styled.div`
  box-shadow:5px 5px 40px 5px rgba(0,0,0,0.5);
`;

function Slider(){
    const [currentIndex,SetCurrentIndex] = useState(0);
    const imageSrc = ["weeaboo.jpg","weeaboo2.jpg","weeaboo3.jpg","weeaboo4.jpg"]; //src는 다 다른걸로 해주세요
    const imageContainer = imageSrc.map((src) => (<Image src={src} key={src} />));

    function useInterval( callback: IntervalFunction, delay: number | null ) {

      const savedCallback = useRef<IntervalFunction| null>( null )
      useEffect( () => {
        if (delay === null) return;
        savedCallback.current = callback
      } )
    
      useEffect( () => {
         if (delay === null) return;
        function tick() {
          if ( savedCallback.current !== null ) {
            savedCallback.current()
          }
        }
        const id = setInterval( tick, delay )
        return () => clearInterval( id )
    
      }, [ delay ] )
    }

    useInterval(() => {SlideSetIndex()},2000);

    function SlideSetIndex(){
        if (currentIndex > 2) {
          SetCurrentIndex(0)
        }
        else if (currentIndex < 0){
          SetCurrentIndex(2)
        }
        else{
            SetCurrentIndex(currentIndex => currentIndex + 1)
        }
    }

    return(
      <ShadowBox>
        <SliderContainer>
          <div className="SlideBox" style={{transform:`translateX(${(-1)*(itemSize*currentIndex)}px)`, transitionDuration:'0.2s'}}>
            <ImgBox>
              {imageContainer}
            </ImgBox>
          </div>
        </SliderContainer>
      </ShadowBox>
    );

};

export default Slider