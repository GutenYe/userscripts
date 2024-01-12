// ==UserScript==
// @name        BambooHR
// @description Enhance BambooHR website
// @version     1.0
// @author      Guten
// @namespace   gutenye
// @grant       GM.xmlHttpRequest
// @match       https://*.bamboohr.com/home
// @match       https://*.bamboohr.com/home/
// ==/UserScript==

function main() {
    const employeeId = SESSION_USER.employeeId
    const year = new Date().getFullYear()
    const endDate = `${year}-12-31`
    GM.xmlHttpRequest({
        url: `/time_off/calculator/calculate?employeeId=${employeeId}&endDate=${endDate}&timeOffType=96`,
        onload,
        responseType: 'json',
    })
}

function onload(res) {
    const found = res.response.total.match(/^\d+.\d+/)
    if (!found) {
        return
    }
    const days = found[0]
    updateDays(days)
}

function updateDays(totalDays) {  
    const currentDays = document.querySelector('.TimeOffWidget__type-available').lastChild
    currentDays.nodeValue = `${currentDays.nodeValue} / ${totalDays}`
}

main()