import dayjs from "dayjs";

const createSchedule = (tenure, amount, commencementDate) => {
    const monthlyPayment = amount / tenure;
    let count = 1;
    const schedule = []
    for (let i = 0; i < tenure; i++) {
        schedule.push({
            paymentStatus: false,
            amount: monthlyPayment,
            day: dayjs(commencementDate).add(count, 'months').format('D'),
            month: dayjs(commencementDate).add(count, 'months').format('MMMM'),
            year: dayjs(commencementDate).add(count, 'months').format('YYYY')
        })
        count += 1;
    }
    return schedule
}

export default createSchedule;