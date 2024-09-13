import Subtitle from "../Typography/Subtitle";

function TitleCard({ title, children, topMargin, TopSideButtons }) {
  return (
    <div className={"card w-full mt-2 border overflow-hidden divide-slate-200   bg-base-100 shadow-xl " + (topMargin || "mt-6")}>

            {/* Title for Card */}
              {/* <Subtitle styleClass={TopSideButtons ? "inline-block" : ""}>
                {title}

                {
                    TopSideButtons && <div className="inline-block float-right">{TopSideButtons}</div>
                }
              </Subtitle> */}
              
              {/* <div className="divider  mb-0"></div> */}
          
              {/** Card Body */}
              <div className='h-full w-full  bg-base-100 divide-y divide-slate-200'>
                  {children}
              </div>
          </div>
  );
}

export default TitleCard;
