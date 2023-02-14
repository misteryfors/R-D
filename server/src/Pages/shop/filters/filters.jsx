import React,{useState} from 'react';
import {useSelector} from "react-redux";
import MultiRangeSlider from "./multiRangeSlider/MultiRangeSlider";
import {getProducts} from "../../../actions/product";


const Filters = ({filtr,dispatch,currentPage,all, setAll, name, setName, type, setType, mark, setMark, minPrice, setMinPrice, maxPrice, setMaxPrice}) => {

    return (

        <div id="filterBox" className="filterBlock" style={{width: '20%',height: '100%',minWidth:'240px'}}>
            <div className="filterBox" id="filters">
                <div className="filterSlot" style={{display: 'block'}}>
                    <div style={{display: 'flex'}}>
                        <div className={"filterTag"}>
                            Название
                        </div>
                        <input className={"filterInput"} value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div style={{display: 'flex'}}>
                        <div className={"filterTag"}>
                            Марка
                        </div>
                        <input className={"filterInput"} value={mark} onChange={(e) => setMark(e.target.value)}/>
                    </div>
                    <div style={{display: 'flex'}}>
                        <div className={"filterTag"}>
                            Тип
                        </div>
                        <input className={"filterInput"} value={type} onChange={(e) => setType(e.target.value)}/>
                    </div>
                    <div style={{display: 'block'}}>
                        <div  style={{width: '90%'}}>
                            <p>Цена: <span id="demo"></span></p>
                            <div style={{boxSizing: 'border-box',margin: '0',padding: '0',width:'200px',marginBottom:'50px'}}>
                                <MultiRangeSlider
                                    min={0}
                                    max={100000}
                                    onChange={({ min, max }) => {console.log(`min = ${min}, max = ${max}`);setMinPrice(min);setMaxPrice(max)}}
                                />
                            </div>
                        </div>
                        <div style={{display: 'flex'}}>
                            <button onClick={()=>{filtr()}}>Фильтр</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Filters;