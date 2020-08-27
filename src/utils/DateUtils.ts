interface FirstAndLastDays {
    first: Date;
    last: Date;
}

interface FilterDate {
  from: Date;
  to: Date;
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

  handleDateFilters (from: string | undefined | Date, to: string | undefined | Date): FilterDate {
    const { first, last } = this.getFirstAndLastDays()
    if (!from) {
      from = first
    } else {
      if (typeof from === 'string') {
        from = new Date(from)
      }
    }

    if (!to) {
      to = last
    } else {
      if (typeof to === 'string') {
        to = new Date(to)
      }
    }

    return {
      from, to
    }
  }
}

export default new DateUtils()
