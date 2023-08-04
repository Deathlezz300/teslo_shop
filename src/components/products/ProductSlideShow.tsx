import React,{FC} from 'react'
import {Slide} from 'react-slideshow-image'
import styles from './ProductSlideShow.module.css';
import 'react-slideshow-image/dist/styles.css'

interface props{
    images:string[]
}

export const ProductSlideShow:FC<props> = ({images}) => {
  return (
    <Slide easing='ease' duration={7000} indicators>
        {
            images.map(im=>{
                return (
                    <div className={styles['each-slide']} key={im}>
                        <div style={{backgroundImage:`url(${im})`,
                            backgroundSize:'cover'}}>

                        </div>
                    </div>
                )
            })
        }
    </Slide>
  )
}
