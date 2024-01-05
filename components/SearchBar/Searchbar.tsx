/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styles from '@/styles/search.module.css'
import { TextField, Button } from '@mui/material'

const SearchBar = (prop: {
  handleSearchChange: any
  handleSearchResult: any
}) => {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search for projects"
        onChange={prop.handleSearchChange}
      />
      <button className={styles.searchButton} onClick={prop.handleSearchResult}>
        <img
          src="/gg_search.svg"
          alt="Logo"
          style={{ width: '22px', height: '22px' }}
        />
      </button>
    </div>
  )
}

export default SearchBar
