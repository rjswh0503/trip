import React from "react";


import Top5Places from "./top5Places";

import RegionList from "./regionList";




const Main = () => {

    return (
        <div className="container mx-auto ">
            <div>


            </div>

            <div className="p-10 flex justify-center my-auto">
                
                <Top5Places />
                
            </div>
            
            <div>

            </div>
            
            <div>

            </div>

            <div className="p-10 ">
                <RegionList />
            </div>
        </div>
    )
}

export default Main;