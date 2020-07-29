class NumberUtils {
  isNumber (value: string | number): boolean {
    if (value === undefined) {
      return false
    }

    return ((value != null) &&
             (value !== '') &&
             !isNaN(Number(value.toString())))
  }
}
export default new NumberUtils()
