class NumberUtils {
  isNumber (value: string | number): boolean {
    return ((value != null) &&
             (value !== '') &&
             !isNaN(Number(value.toString())))
  }
}
export default new NumberUtils()
