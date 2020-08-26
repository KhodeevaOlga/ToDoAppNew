import React from 'react'
import {Button} from '../Button/button';

const buttonList = [
  {
    id: 'all',
    text: 'All',
  },
  {id: 'active',
    text: 'Active',
  },
  {id: 'complete',
    text: 'Complete',
  },
]

export default function ({ activeTab, setActiveTab, counters,deleteAllComplete}) {
  return (
    <div className="footer">
      <ul className="tabs-select">
        <div className="button1">
          {
            buttonList.map(item => (
              <div key={item.id} className={'tab-select-item' + (activeTab === item.id ? ' active' : '')}
                   id={item.id}
                   onClick={setActiveTab}
              >
                {`${item.text} ${counters[item.id]}`}
              </div>
            ))
          }
        </div>
        <div className="button2">
          <Button classNameProps="btnClear" nameButton='Clear completed'
                  onClick={deleteAllComplete}/>
        </div>
      </ul>
    </div>
  )
}

