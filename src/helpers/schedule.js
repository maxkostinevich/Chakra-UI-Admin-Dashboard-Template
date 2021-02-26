import dayjs from "dayjs";

const createSchedule = (tenure, amount, commencementDate) => {
    const monthlyPayment = amount / tenure;
    let count = 1;
    const schedule = []
    for (let i = 1; count !== tenure; i++) {
        schedule.push({
            paymentStatus: false,
            amount: monthlyPayment,
            month: dayjs(commencementDate).add(count, 'months').format('MMMM')
        })
        count += 1;
    }
    return schedule
}

export default createSchedule;