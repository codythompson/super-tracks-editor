import React from 'react'
import range from 'lodash/range'

import styles from '../styles/TopBorder.module.scss'

export default function({columnsWide}) {
  return (
    <div className={styles.TopBorder}>
      {
        range(columnsWide).map((i) => {
          return (
            <div className={styles.Tile} key={i}>
              {i}
            </div>
          )
        })
      }
    </div>
)
}