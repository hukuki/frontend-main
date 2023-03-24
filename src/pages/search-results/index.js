import React from "react";

// Components
import { Flex } from "@/components/base/layout";
import FilterMenu from "../search/FilterMenu";
import SearchResults from "../search/SearchResults";


// CSS
import styles from "./SearchResultsPage.module.css"

const SearchResultsPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles["filters__container"]}>
        Filters
      </div>
      <div className={styles["results__container"]}>
        <div className={styles["searchbar__container"]}>
          Searchbar
        </div>
        <div className={styles["result__container"]}>
          Result 1
        </div>
        <div className={styles["result__container"]}>
          Result 2
        </div>
        <div className={styles["result__container"]}>
          Result 3
        </div>
        <div className={styles["result__container"]}>
          Result 4
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
