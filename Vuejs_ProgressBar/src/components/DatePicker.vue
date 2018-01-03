<template>
  <div class="date-picker"  v-on:click.self="onClick($event)">
        <!-- Day View -->
        <div class= 'calendar' v-on:click.self="onClick($event)">
            <header v-on:click.self="onClick($event)">
                <span
                    @click="previousMonth()"
                    class="left">
                  <svg id="Laag_1" data-name="Laag 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6.012 11.01">
                    <path d="M.278,9.329l2.89-3.124a1.039,1.039,0,0,0,0-1.388L.279,1.686A1.039,1.039,0,0,1,.279.3h0A.862.862,0,0,1,1.565.3l4.18,4.519a1.039,1.039,0,0,1,0,1.389L1.567,10.722a.862.862,0,0,1-1.288,0l0,0A1.04,1.04,0,0,1,.278,9.329Z"/>
                  </svg>
                </span>
                <span class="h_center">
                  <span class="months" @click="showMonthList()">{{ currMonthName }}</span>
                  <span class="years" @click="showYearList()"> {{ currYear }} </span>
                </span>
                <span
                    @click="nextMonth()"
                    class="next">
                  <svg id="Laag_1" data-name="Laag 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6.012 11.01">
                    <path d="M.278,9.329l2.89-3.124a1.039,1.039,0,0,0,0-1.388L.279,1.686A1.039,1.039,0,0,1,.279.3h0A.862.862,0,0,1,1.565.3l4.18,4.519a1.039,1.039,0,0,1,0,1.389L1.567,10.722a.862.862,0,0,1-1.288,0l0,0A1.04,1.04,0,0,1,.278,9.329Z"/>
                  </svg>
                </span>
            </header>
            <hr class="hr">
            <div class="cells" v-on:click.self="onClick($event)" :class="{ behind: behinde(), atfront: atfront() }" id="cells">
              <div class="calenderCells" v-on:click="onClick($event)">
              <span class="cell day-header" v-for="d in daysOfWeek">{{ d }}</span>
              <span class="cell blank" v-for="d in blankDays">{{ d.date }}</span><!--
              --><span class="cell day"
                  v-for="day in days"
                  :class="dayClasses(day)"
                  @click="selectDate(day)">{{ day.date }}</span><!--
              --><span class="cell after" v-for="day in afterDays">{{ day.date }}</span>
              </div>
                <button class="applyButton" @click="apply()"  v-on:click="onClick($event)">Apply</button>
            </div>
            
              <ul class="monthList" v-show="showMonths" >
                <div class="selectMonth" id="selectMonth">
                    <li v-for="m in monthsL" @click="setMonth(m.mNum)" :class="monthSelected(m.mNum)">
                        {{ m.mName }}
                    </li>
                </div>
              </ul>
              <ul class="yearList" v-show="showYears">
                <div class="selectYear"  id="selectYear">
                    <li v-for="year in years" @click="setYear(year)" :class="monthSelected(year)">
                        {{ year }}
                    </li>
                </div>
              </ul>
            
        </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      // variable keep the local date of the calender
      pageDate: (new Date()).setDate(1),
      selectedDate: new Date(),
      showMonths: false,
      showYears: false
    }
  },
  computed: {
    // getter for the pageDate variable
    getPageDate () {
      return new Date(this.pageDate)
    },
    // return the names of the months and the days
    names () {
      return {
        'months': {
          'original': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          'abbr': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        'days': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      }
    },
    // return the full name of the month
    currMonthName () {
      let monthName = this.names.months.original
      return monthName[this.getPageDate.getMonth()]
    },
    // return the current year that shown to the user in the calendar
    currYear () {
      return this.getPageDate.getFullYear()
    },
    // number of the blank days before the first day of the month
    blankDays () {
      let d = this.getPageDate
      let dObj = new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes())
      // Date.getDay reuturn the number of the day in the week (0=>6)
      let bLength = dObj.getDay()
      let beforeDays = []
      dObj.setMonth(dObj.getMonth() - 1)
      let daysInMonth = this.daysInMonth(dObj.getFullYear(), dObj.getMonth())
      for (let i = 0; i < bLength; i++) {
        beforeDays.unshift({
          date: daysInMonth
        })
        daysInMonth--
      }
      return beforeDays
    },
    // return numbers of days in the week (28,29,30,31)
    daysOfWeek () {
      return this.names.days
    },
    // intialize and create the days array wich will be shown in the calendar
    days () {
      let d = this.getPageDate
      let days = []
      let dObj = new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes())
      let daysInMonth = this.daysInMonth(dObj.getFullYear(), dObj.getMonth())
      for (let i = 0; i < daysInMonth; i++) {
        days.push({
          date: dObj.getDate(),
          timestamp: dObj.getTime(),
          isSelected: this.isSelectedDate(dObj.getTime())
        })
        dObj.setDate(dObj.getDate() + 1)
      }
      return days
    },
    afterDays () {
      let d = this.getPageDate
      let afterDays = []
      let daysInMonth = this.daysInMonth(d.getFullYear(), d.getMonth())
      let dObj = new Date(d.getFullYear(), d.getMonth(), daysInMonth, d.getHours(), d.getMinutes())
      let theLength = (6 - dObj.getDay())
      dObj.setDate(dObj.getDate() + 1)
      for (let i = 0; i < theLength; i++) {
        afterDays.push({
          date: dObj.getDate()
        })
        dObj.setDate(dObj.getDate() + 1)
      }
      return afterDays
    },
    years () {
      let years = []
      let i = this.currYear - 5
      let j = i + 10
      for (i; i < j; i++) {
        years.push(i)
      }
      return years
    },
    monthsL () {
      let mList = []
      let monthName = this.names.months.original
      for (let i = 0; i < 12; i++) {
        mList.push({
          mName: monthName[i],
          mNum: i
        })
      }
      return mList
    }
  },
  methods: {
    isSelectedDate (timestamp) {
      let dObj = new Date(timestamp)
      return this.selectedDate.toDateString() === dObj.toDateString()
    },
    // return number of days in the enterde month
    daysInMonth (year, month) {
      // 1,3,5,7,8,10,12 are 31 days, 4,6,9,11 are 30
      if (month === 3 || month === 5 || month === 8 || month === 10) {
        return 30
      } else if (month === 1) {
        if ((!(year % 4) && year % 100) || !(year % 400)) {
          return 29
        } else return 28
      } else return 31
    },
    // return the selected date as a console log message
    selectDate (day) {
      let ob = new Date(day.timestamp)
      this.selectedDate = ob
      let refresh = new Date()
      ob.setHours(refresh.getHours())
      ob.setMinutes(refresh.getMinutes())
      ob.setSeconds(refresh.getSeconds())
    },
    formatDate (date) {
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let str = ''
      if (day < 10) {
        str = '0' + day
      } else {
        str = day
      }
      if (month < 10) {
        str += '-0' + month
      } else {
        str += '-' + month
      }
      str += '-' + year
      return str
    },
    apply () {
      let formatted = this.formatDate(this.selectedDate)
      console.log('formated date: ' + formatted)
      console.log('selected date: ' + this.selectedDate)
    },
    showMonthList () {
      if (this.showMonths) {
        this.close()
      } else {
        this.showYears = false
        this.showMonths = true
      }
    },
    showYearList () {
      if (this.showYears) {
        this.close()
      } else {
        this.showYears = true
        this.showMonths = false
      }
    },
    collapseList () {
      if (this.showMonths) {
        this.close()
      }
    },
    close () {
      this.showYears = false
      this.showMonths = false
    },
    dayClasses (day) {
      return {
        'selected': day.isSelected
      }
    },
    monthSelected (mNum) {
      if (mNum === this.getPageDate.getMonth() || mNum === this.getPageDate.getFullYear()) {
        return {
          'mSelected': true
        }
      } else {
        return null
      }
    },
    behinde () {
      if (this.showMonths || this.showYears) {
        return {
          'behind': true
        }
      } else {
        return null
      }
    },
    atfront () {
      if (!(this.showMonths || this.showYears)) {
        return {
          'atfront': true
        }
      } else {
        return null
      }
    },
    previousMonth () {
      this.close()
      let date = this.getPageDate
      date.setMonth(this.getPageDate.getMonth() - 1)
      this.setPageDate(date)
    },
    nextMonth () {
      this.close()
      let date = this.getPageDate
      date.setMonth(this.getPageDate.getMonth() + 1)
      this.setPageDate(date)
    },
    // the setter of the variable pageDate
    setPageDate (date) {
      this.pageDate = (new Date(date)).setDate(1)
    },
    setYear (year) {
      let date = new Date()
      date.setFullYear(year)
      this.setPageDate(date)
      this.close()
    },
    setMonth (month) {
      let date = this.getPageDate
      date.setMonth(month)
      this.setPageDate(date)
      this.close()
    },
    onClick (event) {
      this.close()
    }
  }
}
</script>

<style>
.date-picker{
  position: relative;
  text-align: center;
  width: 100%;
  height: 100%;
  padding-top: 50px;
  }
.calendar {
  margin-left: 650px;
  width: 275px;
  box-shadow: 2px 2px 10px #D3D3D3;
}
header {
  line-height: 50px;
  height: 50px;
  width: 275px;
  margin-bottom: 0px;
}
.h_center {
  width: 165px;
  text-align: center;
  margin-left: 65px;
  margin-right: 15px;
}
.left {
  position: relative;
  transform: rotate(176deg);
  top: 37px;
  height: 12px;
  margin-left: 10px;
  width: 7.5px;
  cursor: pointer;
}
header span {
  height: 50px;
  color: white;
  text-align: center;
  float: left;
}
.next{
  width: 7.5px;
  cursor: pointer;
  top:0px;
  height: 12px;
  margin-left: -3px;
}
.hr {
  border-top: 1px solid #afafaf;
  position: absolute;
  width: 274px;
  margin-top: 0px;
}
.cell {
  display: inline-block;
  margin: 0px;
  padding: 0 5px;
  width: 34px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  vertical-align: middle;
  border: 1px solid transparent;
  font-family: 'roboto', sans-serif;
  cursor: pointer;
  font-weight: 400;
  color: #afafaf;
  box-sizing: border-box;
  font-size: 13px;
}
.blank, .after {
  cursor:auto;
  color: #dddddd;
  font-family: 'roboto', sans-serif;
  font-weight: 300;
}
.day:hover{
  background-color: #eeeeee;
	border-radius: 55px;
}
.selected {
  background-color: #00bbd5;
	border-radius: 55px;
  color: white;
}
.selected:hover{
  background-color: #00bbd5;
	border-radius: 55px;
  color: white;
}
.day-header {
  font-weight: 600;
  font-size: 12px;
  cursor: inherit;
  color: #58585b;
}
.applyButton {
  height: 50px;
  width: 225px;
  background-color: #4d5d7d;
  color: white;
  outline: none;
  cursor: pointer;
  border: none;
  margin-top: 10px;
  margin-bottom: 20px;
}
.cells {
  width: 275px;
  text-align: center;
}
.behind {
  background: #eeeeee;
  position: absolute;
  z-index: -1;
}
.atfront {
  background: white;
  position: static;
  z-index: 1;
}
.calenderCells {
  height: 240px;
  width: 245px;
  margin-left: 15px;
}
.months {
  /*
  text-align: right;
  margin-right: 10px;
  margin-left: 50px;*/
  margin-right: 10px;
  max-width: 75px;
  min-width: 50px;
  text-align: center;
  cursor: pointer;
  color: #58585b;
  font-weight: 300;
  font-family: 'roboto', sans-serif;
}
.years {
  cursor: pointer;
  color: #58585b;
  margin-right: 20px;
}
.monthList {
    margin-top: 0px;
    position: relative;
    z-index: 1;
    font-family: 'Roboto', sans-serif;
}
.yearList {
    margin-top: 0px;
    position: relative;
    z-index: auto;
    margin-left: 55px;
}
li {
  height: 30px;
  cursor: pointer;
}
li:hover{
  background: #eee;
}
.selectMonth {
  position: relative;
  z-index: 1;
  background: white;
  list-style-type: none;
  line-height: 35px;
  font-weight: 300;
  font-size: 13px;
  width: 150px;
  height: 280px;
  text-align: center;
  margin-top: 0px;
  box-shadow: 2px 2px 10px #D3D3D3;
  float: left;
  overflow: auto;
}
.selectYear {
  position: relative;
  z-index: auto;
  background: white;
  list-style-type: none;
  line-height: 35px;
  font-size: 13px;
  width: 150px;
  height: 280px;
  font-weight: 300;
  text-align: center;
  margin-top: 0px;
  box-shadow: 2px 2px 10px #D3D3D3;
  float: left;
  overflow: auto;
}
.mSelected {
  background-image: url("../assets/selectedDot.svg");
  background-repeat: no-repeat;
}
.mSelected:hover {
  background-image: url("../assets/selectedDot.svg");
  background-repeat: no-repeat;
}
</style>
