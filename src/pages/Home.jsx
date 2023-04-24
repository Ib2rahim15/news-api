import React from 'react'
import './Home.css'
import SearchBar from '../components/SearchBar/SearchBar'
import MainNews from '../components/mainNews/MainNews'
import AuthorFooter from '../components/authorFooter/AuthorFooter'
import SideBar from './../components/sideBar/SideBar';
import Logo from './../components/logo/Logo';
import FakeNews from './../../src/FakeNews.json'



const Home = () => {
  const [Rusalt, setRusalt] = React.useState("");
  const [FakeActive, setFakeActive] = React.useState(false);
  const [arucals, setArticles] = React.useState([]);

  const GetRuslt = (InputSearch) => {
    setRusalt(InputSearch)
  };
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://newsapi.org/v2/everything?' +
          `q=${Rusalt}&` +
          `pageSize=10&`+
          `sortBy=popularity&`+
          'apiKey=5efcef9552ca41f1ab30a451fa5c2218';
        const req = new Request(url);
        const response = await fetch(req);
        if (response.ok) {
          const data = await response.json();
          setArticles(data.articles);
          setFakeActive(false);
        } else if (response.status === 429||response.status === 426) {
          setArticles(FakeNews);
          setFakeActive(true);
        } else {
          throw new Error("حدث خطأ ما");
        }
      } catch (error) {
        console.error(error.message);
        setArticles([]);
      }
    }
    if (Rusalt) {
      fetchData();
    }
  }, [Rusalt]);

  return (
    <main className='parent'>
      <SearchBar GetRuslt={GetRuslt}/>
      <Logo />
      <MainNews arucals={arucals} FakeActive={FakeActive} />
      <SideBar />
      <AuthorFooter />
    </main>
  )
}

export default Home