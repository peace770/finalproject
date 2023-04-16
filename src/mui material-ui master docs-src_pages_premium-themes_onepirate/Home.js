import * as React from 'react';
import ProductCategories from './modules/views/ProductCategories';
import ProductSmokingHero from './modules/views/ProductSmokingHero';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';
import ProductHowItWorks from './modules/views/ProductHowItWorks';
import ProductCTA from './modules/views/ProductCTA';
import AppAppBar from './modules/views/AppAppBar';
import withRoot from './modules/withRoot';
import { Course } from '../components/FirebaseContext';


function Index() {
  const [courseList, setCorselist]= React.useState([])
  const [search, setSearch]= React.useState(``);
  React.useEffect(()=>{
    Course.getAllCourses().then(data=>setCorselist(data.docs.map(doc=>doc.data())))
  },[])
  console.log(search);
  
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero courseList={courseList} search={search} setSearch={setSearch}/>
      {/* <ProductValues /> */}
      {/* <ProductCategories /> */}
      {/* <ProductHowItWorks /> */}
      {/* <ProductCTA /> */}
      {/* <ProductSmokingHero /> */}
      {/* <AppFooter /> */}
    </React.Fragment>
  );
}

export default withRoot(Index);
