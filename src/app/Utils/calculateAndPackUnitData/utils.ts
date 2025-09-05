export const normalizeRawNumber = (rawNumber: any) => {
  if (rawNumber === null) {
    return null;
  }

  if (Number.isNaN(rawNumber)) {
    return null;
  }

  if (typeof rawNumber === 'number') {
    return rawNumber;
  }

  if (typeof rawNumber === 'string') {
    const normalizedRow = rawNumber.replace(',','.')

    if (isNaN(normalizedRow)) {
      return null;
    }

    if (normalizedRow === '') {
      return null;
    }

    return Number(normalizedRow);
  }

  return null;
}

export const getIsAllValuesArNotEmpty = (...values: (number | null)[]) => {
  return values.every(value => value !== null);
}
