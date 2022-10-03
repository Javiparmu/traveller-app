import { useState } from 'react';

export const useDates = () => {

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month, 0).getDate();
    }

    const getWeekDayFromDate = (date: Date) => {
        const weekDays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        return weekDays[date.getDay()];
    }

    return {
        getDaysInMonth,
        getWeekDayFromDate
    }
}