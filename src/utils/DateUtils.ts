interface FirstAndLastDays {
    first: Date;
    last: Date;
}
class DateUtils {
  getFirstAndLastDays (
    fullyear = new Date().getFullYear(), monthIndex = new Date().getMonth()
  ):FirstAndLastDays {
    const first = new Date(fullyear, monthIndex, 1)
    const last = new Date(fullyear, monthIndex + 1, 0)

    return {
      first,
      last
    }
  }
}

export default new DateUtils()
