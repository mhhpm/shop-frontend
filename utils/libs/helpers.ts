export const getAvatarUrl = (name: string) => {
  return `https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff`
}

export const numberWithCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
