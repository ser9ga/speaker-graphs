export const normalizeRawNumber = (rawNumber: unknown) => {
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

    if (isNaN(Number(normalizedRow))) {
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
