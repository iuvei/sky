const getFields = type => {
  let fields
  switch (type) {
    case 1:
      fields = [{ key: 'HTG', name: '半场' }, { key: 'TG', name: '全场' }]
      break

    default:
      break
  }
  return fields
}

export const getRaceInfo = (type, data) => getFields(type).map(item => ({
  name: item.name,
  SCH: data.result_data.SC.H[item.key],
  SCV: data.result_data.SC.V[item.key]
}))
