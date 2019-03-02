import React, { Component } from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import superagent from 'superagent'
import Header from './Header'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)

    this.defultChartData = [{year: 1960,}, {year: 1965,}, {year: 1970,}, {year: 1975,}, {year: 1980,}, {year: 1985,}, {year: 1990,}, {year: 1995,}, {year: 2000,}, {year: 2005,}, {year: 2010,}, {year: 2015,}, {year: 2020,}, {year: 2025,}, {year: 2030,}, {year: 2035,}, {year: 2040,}, {year: 2045,},]
    this.clickHandler = this.clickHandler.bind(this)

    this.state = {
      prefectures: null, // 都道府県データ
      chartData: this.defultChartData // グラフデータ
    }
  }

  // 都道府県一覧を取得
  getPrefectures () {
    superagent.get('https://opendata.resas-portal.go.jp/api/v1/prefectures')
      .set('X-API-KEY', 'MCOgUhZu1Cc7EZsoRYBmpfTRlSmUieEp66tI3xnx')
      .set('Accept', 'application/json')
      .then(res => {
        const data = res.body.result.map(e => {
          e.isChecked = false
          return e
        })
        this.setState({prefectures: data})
      }, err => {
        console.error(err)
      })
  }

  // 人口データを取得
  getChartData (prefectureId) {
    const url = 'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear'
    const _self = this

    return new Promise(function (resolve, reject) {
      superagent.get(url)
        .query({
          prefCode: prefectureId,
          cityCode: '-',
        })
        .set('X-API-KEY', 'MCOgUhZu1Cc7EZsoRYBmpfTRlSmUieEp66tI3xnx')
        .set('Accept', 'application/json')
        .then(res => {
          res.body.result.data[0].id = prefectureId
          res.body.result.data[0].idName = _self.state.prefectures[prefectureId - 1].prefName
          console.log('res', res.body.result.data[0]);
          resolve(res.body.result.data[0])
        }, err => {
          reject(err)
        })
    })
  }

  // チェックされている都道府県の人口データを取得
  checkedData () {
    const getIdList = []
    const data = []
    const _self = this

    _self.state.prefectures.forEach((val) => {
      if (val.isChecked) {getIdList.push(val)}
    })

    return new Promise(function (resolve, reject) {
      if (getIdList.length === 0) {
        resolve(data)
      } else {
        getIdList.forEach((val, index) => {
          _self.getChartData(val.prefCode)
            .then(res => {
              data.push(res)

              if (index + 1 === getIdList.length) {
                console.log('checkedData', data.length, data);
                resolve(data)
              }
            })
        })
      }
    })
  }

  // グラフに描画するデータへ整形
  formatData (data) {
    const formatedData = []

    // 年度のみformatedDataへ追加
    if (data.length === 0) {
      return formatedData
    } else {
      data[0].data.forEach((val) => {
        const obj = {}
        obj['year'] = val.year
        formatedData.push(obj)
      })
    }

    data.forEach((obj) => {
      const name = obj.idName

      obj.data.forEach((val) => {
        formatedData.forEach((formatedDataVal) => {
          if (formatedDataVal.year === val.year) {
            formatedDataVal[name] = val.value
          }
        })
      })
    })

    return formatedData
  }

  componentWillMount () {
    this.getPrefectures()
  }

  clickHandler (e) {
    // クリックされた都道府県の都道府県コードを取得
    const elm = e.currentTarget;
    const getPrefectureId = elm.getAttribute('id')

    // チェックボックスの状態管理
    const newPrefectures = this.state.prefectures.slice();
    newPrefectures.forEach((index) => {
      if (String(index.prefCode) === getPrefectureId) {
        index.isChecked = !index.isChecked
      }
    })

    // チェックされている都道府県の人口データを取得
    this.checkedData()
      .then(res => {
        const formatdData = this.formatData(res)
        this.setState({
          prefectures: newPrefectures,
          chartData: formatdData
        })
      })
  }

  render () {
    if (!this.state.prefectures) {
      return <div>読み込み中・・・</div>
    }

    const checkBoxs = this.state.prefectures.map(e => {
      return (
        <li key={e.prefCode}>
          <label htmlFor={e.prefCode}>
            <input type="checkbox" id={e.prefCode} checked={e.isChecked} onChange={this.clickHandler} />
            {e.prefName}
          </label>
        </li>
      )
    })

    const lines = this.state.prefectures.map(e => {
      return <Line type="monotone" key={e.prefName} dataKey={e.prefName} stroke="#82ca9d"/>
    })

    const renderLineChart = (
      <div style={{width: '100%', height: '30vw', paddingLeft: 100}}>
        <ResponsiveContainer>
          <LineChart
            data={this.state.chartData}
            margin={{top: 5, right: 20, bottom: 5, left: 0}}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis
              dataKey="year"
              ticks={[1965, 1975, 1985, 1995, 2005, 2015, 2025, 2035, 2045]}
              unit="年"
            />
            <YAxis
              ticks={[1000000, 2000000, 3000000, 4000000, 5000000, 6000000, 7000000, 8000000, 9000000, 10000000, 11000000, 12000000, 13000000, 14000000, 15000000]}
              unit="人"
            />
            <Tooltip/>
            {lines}
          </LineChart>
        </ResponsiveContainer>
      </div>
    )

    console.log('render!!!!!!!!!!!!!')

    return (
      <div className="App">
        <Header/>

        <div className="row">
          <div className="col">
            <ul className="prefectures">
              {checkBoxs}
            </ul>
          </div>
          <div className="col">
            {renderLineChart}
          </div>
        </div>
      </div>
    )
  }
}

export default App
