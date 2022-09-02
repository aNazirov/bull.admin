// import { Swiper } from "swiper/react";

// import "swiper/css";
// import { Navigation } from "swiper";
// import { Children, useState } from "react";

// interface Props {}

// export const CSlider: React.FC<Props> = ({ children }) => {
//   const [swiper, setSwiper] = useState<any>();
//   const count = Children.count(children);

//   return (
//     <Swiper
//       modules={[Navigation]}
//       spaceBetween={30}
//       slidesPerView={1}
//       // onSlideChange={() => console.log("slide change")}
//       onSwiper={(swiper) => setSwiper(swiper)}
//       className="relative group"
//     >
//       {children}
//       {![0, 1].includes(count) && (
//         <div className="duration-200 opacity-100 flex absolute z-50 left-52 right-52 bottom-10 justify-center items-center gap-4 mt-2">
//           <button
//             className="px-4 bg-blue-600 text-white border rounded-md border-blue-500 cursor-pointer"
//             onClick={() => swiper.slidePrev()}
//           >
//             Prev
//           </button>
//           <button
//             className="px-4 bg-blue-600 text-white border rounded-md border-blue-500 cursor-pointer"
//             onClick={() => swiper.slideNext()}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </Swiper>
//   );
// };

export {};
