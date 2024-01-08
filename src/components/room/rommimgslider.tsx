import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Image } from '../../interfaces/Room';


type RoomSliderProps = {
    sliderImgs:Image[]
}
const RoomImgSlider = ({sliderImgs}:RoomSliderProps) =>{
    return(
        <Swiper style={{width:"100%"}} navigation={true} modules={[Navigation]}>
            {
                sliderImgs.map((img:Image)=>{
                    return(
                        <SwiperSlide key={img._id}>
                            <img alt="imgslider" height="380px" width="100%" src={`${img.image}`} />
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}
export default RoomImgSlider;