'use strict'

// Labels
const labelWelcome = document.querySelector('.welcome')
const labelDate = document.querySelector('.date')
const labelBalance = document.querySelector('.balance__value')
const labelSumIn = document.querySelector('.summary__value--in')
const labelSumOut = document.querySelector('.summary__value--out')
const labelSumInterest = document.querySelector('.summary__value--interest')
const labelTimer = document.querySelector('.timer')

// Containers
const containerApp = document.querySelector('.app')
const containerMovements = document.querySelector('.movements')

// Buttons
const btnLogin = document.querySelector('.login__btn')
const btnTransfer = document.querySelector('.form__btn--transfer')
const btnLoan = document.querySelector('.form__btn--loan')
const btnClose = document.querySelector('.form__btn--close')
const btnSort = document.querySelector('.btn--sort')

// Inputs
const inputLoginUsername = document.querySelector('.login__input--user')
const inputLoginPin = document.querySelector('.login__input--pin')
const inputTransferTo = document.querySelector('.form__input--to')
const inputTransferAmount = document.querySelector('.form__input--amount')
const inputLoanAmount = document.querySelector('.form__input--loan-amount')
const inputCloseUsername = document.querySelector('.form__input--user')
const inputClosePin = document.querySelector('.form__input--pin')

// Accounts
const account1 = {
  owner: 'S3tt1ngs',
  movements: [200, 600, -327, 14000, -988, -362, 1500, -80],
  interestRate: 1.2, // in %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2020-12-23T07:42:02.383Z',
    '2021-02-28T09:15:04.904Z',
    '2021-04-01T10:17:24.185Z',
    '2022-04-14T14:11:59.604Z',
    '2022-04-16T17:01:17.194Z',
    '2022-04-17T23:36:17.929Z',
    '2022-04-20T10:51:36.790Z',
  ],
  currency: 'KES',
  locale: 'en-IN',
}

const account2 = {
  owner: 'Tahera Khan',
  movements: [350, 600, -400, -500, 15000, 1300, -1200, -450, 80],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2021-02-05T16:33:06.386Z',
    '2021-04-10T14:43:26.374Z',
    '2022-04-13T18:49:59.371Z',
    '2022-04-17T12:01:20.894Z',
    '2022-04-19T14:23:33.867Z',
  ],
  currency: 'USD',
  locale: 'en-US',
}

const account3 = {
  owner: 'Rahul Chavan',
  movements: [5000, -3000, -1675, 10000, 300, -689, -90, 1200, -1100],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2021-08-27T17:01:17.194Z',
    '2022-04-12T23:36:17.929Z',
    '2022-04-15T10:51:36.790Z',
    '2022-04-17T14:23:33.867Z',
  ],
  currency: 'EUR',
  locale: 'en-GB',
}

const account4 = {
  owner: 'Deepshika Singh',
  movements: [5000, 3400, -150, -790, -3210, -1000, 18500, -30],
  interestRate: 1.2,
  pin: 4444,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2020-12-23T07:42:02.383Z',
    '2021-02-28T09:15:04.904Z',
    '2021-04-01T10:17:24.185Z',
    '2022-04-14T14:11:59.604Z',
    '2022-04-16T17:01:17.194Z',
    '2022-04-17T23:36:17.929Z',
    '2022-04-20T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: '',
}

// accounts ARR
const accounts = [account1, account2, account3, account4]

// Formatting Date Function
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24))

  const dayPassed = calcDaysPassed(new Date(), date)
  console.log(dayPassed)

  if (dayPassed === 0) return 'Today'
  if (dayPassed === 1) return 'Yesterday'
  if (dayPassed <= 7) return `${dayPassed} days ago`
  else {
    return new Intl.DateTimeFormat(locale).format(date)
  }
}

// Formatting Currency function
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value)
}

const startLogOutTimer = function () {
  // Set Time to 5 minutes
  let time = 300

  // call back fun
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0)
    const sec = String(time % 60).padStart(2, 0)

    // In each fun call, print the remaining time to the UI
    labelTimer.textContent = `${min}:${sec}`

    // When 0 secs, stop the timer and log out user
    if (time === 0) {
      clearInterval(timer)
      labelWelcome.textContent = 'Log In to get started'
      containerApp.style.opacity = 0
    }
    // Decrease the time with 1s
    time--
  }

  // call the timer every second
  tick()
  const timer = setInterval(tick, 1000)
  return timer
}

// Money Movements
const displayMovements = function (acc, sort = false) {
  // Emptying the pre-defined movements
  containerMovements.innerHTML = ''

  const movsSort = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements

  movsSort.forEach(function (movement, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal'

    const date = new Date(acc.movementsDates[index])
    const displayDate = formatMovementDate(date)

    const formattedMov = formatCur(movement, acc.locale, acc.currency)

    const html = `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
        </div>
        `
    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
}

// Balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0)
  // acc.balance = balance

  labelBalance.textContent = `${formatCur(
    acc.balance,
    acc.locale,
    acc.currency
  )}`
}

// Username
const createUserNames = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('')
  })
}
createUserNames(accounts)

// Summary
const calcDisplaySummary = function (account) {
  // Incoming
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0)
  labelSumIn.textContent = `${formatCur(
    incomes,
    account.locale,
    account.currency
  )}`

  // Outgoing
  const outcomes = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0)
  labelSumOut.textContent = `${formatCur(
    Math.abs(outcomes),
    account.locale,
    account.currency
  )}`

  // Interest
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int)
  labelSumInterest.textContent = `${formatCur(
    interest,
    account.locale,
    account.currency
  )}`
}

const updateUI = function (acc) {
  // Display Movements
  displayMovements(acc)

  // Display Balance
  calcDisplayBalance(acc)

  // Display Summary
  calcDisplaySummary(acc)
}

// Event Handler
let currentAccount, timer

// Login
btnLogin.addEventListener('click', function (event) {
  event.preventDefault()

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  )
  if (currentAccount?.pin === +inputLoginPin.value) {
    containerApp.style.opacity = 100

    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`

    // Create Date
    const now = new Date()

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    }

    // Navigator API
    // const locale = navigator.language

    // Formatting Date with Internationalization API
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now)

    // Clear input fields
    inputLoginPin.value = inputLoginUsername.value = ''
    inputLoginPin.blur()

    // Resetting the timer
    if (timer) {
      clearInterval(timer)
    }
    timer = startLogOutTimer()

    // Update UI
    updateUI(currentAccount)
  } else {
    containerApp.style.opacity = 0
    inputLoginPin.value = inputLoginUsername.value = ''
    inputLoginPin.blur()
  }
})

// Transfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault()

  const amount = +inputTransferAmount.value
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  )

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount)
    receiverAcc.movements.push(amount)

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString())
    receiverAcc.movementsDates.push(new Date().toISOString())

    // Update UI
    updateUI(currentAccount)
  }
  inputTransferAmount.value = inputTransferTo.value = ''
  inputTransferAmount.blur()

  // Resetting the timer
  clearInterval(timer)
  timer = startLogOutTimer()
})

// Loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault()

  const amount = Math.floor(inputLoanAmount.value)

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount)

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString())

      // Update UI
      updateUI(currentAccount)

      // Reset timer
      clearInterval(timer)
      timer = startLogOutTimer()
    }, 5000)
  }
  inputLoanAmount.value = ''
})

// Close Acc
btnClose.addEventListener('click', function (e) {
  e.preventDefault()

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    )

    // Delete Acc
    accounts.splice(index, 1)

    // Hide UI
    containerApp.style.opacity = 0
  }
  labelWelcome.textContent = 'Thankyouu !!'
  inputCloseUsername.value = inputClosePin.value = ''
  inputClosePin.blur()
})

// Variable for de-sorting
let sorted = false

// Sort
btnSort.addEventListener('click', function (e) {
  e.preventDefault()
  displayMovements(currentAccount, !sorted)
  sorted = !sorted
})
