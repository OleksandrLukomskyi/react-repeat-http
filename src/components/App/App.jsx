import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import css from "./App.module.css";
import ArticleList from "../ArticleList/ArticleList";
import { fetchArticles } from "../article-api";
import SearchForm from "../SearchForm/SearchForm";

export default function App() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function getData() {
      try {
        setIsLoading(true)
        setError(false)
        const data = await fetchArticles(query, page);
        setArticles((prevArticles) => {
          return [...prevArticles, ...data];
        });
        toast.success("HTTP success!!! ")
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [page, query]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setArticles([])
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {error && <b>Oops! Error! Reload!</b>}
      {articles.length > 0 &&  <ArticleList items={articles} />}

      {articles.length > 0 &&
      !isLoading &&
      (
        <button onClick={handleLoadMore}>Load more</button>
      )}
      {isLoading && <b>Loading articles.....</b>}
      <Toaster/>
    </div>
  );
}
