import * as React from 'react';
import styles from './index.module.css';
import {Select,MenuItem,FormControl,InputLabel} from '@material-ui/core';
import { GoogleMap, useJsApiLoader ,Polygon,KmlLayer} from '@react-google-maps/api';
import STATE_LIST from '../../../../../public/geoData/state_list.json'

interface Props {
    t:(params: String) => string;
    onselectedSub:(list:string)=>void;
  }
  


function Map(props: Props){
    const {t} = props
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    
    const [state,setState] =React.useState(0)
    const [currentState,setCurrentState] =React.useState(null)
    const [selectSuburb,setSelectSuburb] = React.useState('')
    const [value,setValue]  = React.useState("vic")
    const [feature,setFeature]  = React.useState([])
    const [currentSuburb,setCurrentSuburb]= React.useState('')
    
    const forceUpdate = ()=>{
        setState(prev=>prev+=1)
    }
    const containerStyle = {
        width: '100%',
        height: '500px'
      };
      
      const [center,setCenter]=React.useState({
        lat: -37.840934,
        lng: 144.946454
      })

      const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY
      })
     
    
      const [map, setMap] = React.useState(null)
      const options = {
        fillColor: "lightblue",
        fillOpacity: 1,
        strokeColor: "red",
        strokeOpacity: 1,
        strokeWeight: 2,
        clickable: false,
        draggable: false,
        editable: false,
        geodesic: false,
        zIndex: 1
      }
      
      const handleChange =(event:any)=>{

        let tempMap = {}
        Object.assign(tempMap,map)
        google.maps.event.clearListeners(map.data, 'click');
        setMap(tempMap)
        setValue(event.target.value)
        setCenter(STATE_LIST[event.target.value].loc)
        feature.map((f)=>{
          map.data.remove(f)
        })
        
      }
      const onLoad = React.useCallback(function callback(map) {
        setMap(map)
        
      }, [])

      React.useEffect(() => {
        if (map) {
          forceUpdate()
          loadGeoJsonString()
        }
        if(selectSuburb){
        }
        if (value) {
          forceUpdate()
        }
      }, [map,value])


      const loadGeoJsonString=()=> {
        try {
          map.data.loadGeoJson(
            STATE_LIST[value].data,{},
            (feature)=>{setFeature(feature)}
          );
          map.data.setStyle((feature) => {
            let color = "#8d8d8d";
        
            if (feature.getProperty("isColorful")) {
              color = '#3464DC'
            }
            return {
              fillColor: color,
              strokeColor: color,
              strokeWeight: 1,
            };
          });
          map.data.addListener("click", (event:any) => {
            if(event.feature.getProperty('isColorful')){
              event.feature.setProperty("isColorful", false);
            }else{
              event.feature.setProperty("isColorful", true);
            }
            
            setSelectSuburb((prev) => {
              if(event.feature.i.postcode){
                if(prev.includes(event.feature.i.suburb+' '+event.feature.i.postcode+", ")){
                  props.onselectedSub(prev.replace(event.feature.i.suburb+' '+event.feature.i.postcode+" ",''))
                  return prev.replace(event.feature.i.suburb+' '+event.feature.i.postcode+" ",'')
                }else{
                  props.onselectedSub(prev+event.feature.i.suburb+' '+event.feature.i.postcode+", ")
                  return prev+event.feature.i.suburb+' '+event.feature.i.postcode+", "
                }
              }else{
                if(prev.includes(event.feature.i.suburb+", ")){
                  // props.onselectedSub
                  return prev.replace(event.feature.i.suburb+", ",'')
                }else{
                  return prev+event.feature.i.suburb+", "
                }
              }
              
            })
          });

          map.data.addListener("mouseover", (event:any) => {
            map.data.revertStyle();
            setCurrentSuburb(event.feature.i.suburb)
            
            map.data.overrideStyle(event.feature, { 
              strokeWeight: 3, });
          });
          map.data.addListener("mouseout", (event) => {
            map.data.revertStyle();
          });
        
        } catch (e) {
          console.log("Not a GeoJSON file!");
        }
      }
      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
        forceUpdate()
      }, [])
    return(

      <div className={styles.map_inner_container}>
         <div className={styles.map_option_info_container}>
          <FormControl className={styles.formControl}>
            <InputLabel id="demo-simple-select-label">{t('dashboard.acc.delivery.setDelivery.setState')}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              onChange={handleChange}
            >
              {Object.values(STATE_LIST).map(state=>
                (<MenuItem key={state.id} value={state.id}>{state.value}</MenuItem>)
              )}
              
            </Select>
        </FormControl>
        <div className={styles.label_container_sub}>
          <div className={styles.label_title}>{t('dashboard.acc.delivery.setDelivery.label')}</div>
          <div className={styles.label_content}>{currentSuburb}</div>
        </div>
        <div className={styles.label_container}>
          <div className={styles.label_title}>{t('dashboard.acc.delivery.setDelivery.selectedList')}</div>
          <div className={styles.label_content}>{selectSuburb}</div>
        </div>
        </div>
        {isLoaded ?
        
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={10}
            center={center}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
        
        </GoogleMap>: <></>
        }
       
      </div>
        
    ) 
}

export default React.memo(Map)