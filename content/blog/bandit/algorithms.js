import { sum, max, flatten } from "lodash"
import { randomInt, randomBeta } from "d3"

export let epsilonGreedy = (epsilon = 0.1) => {
  return pulls => {
    let means = pulls.map(ps => sum(ps) / ps.length)

    if (max(means) && Math.random() > epsilon) {
      return means.indexOf(max(means))
    } else {
      return randomInt(0, pulls.length)()
    }
  }
}

export let ucb = pulls => {
  let numerator = 2 * Math.log(flatten(pulls).length)

  let ucbs = pulls.map(
    ps => sum(ps) / ps.length + Math.sqrt(numerator / ps.length)
  )

  let unexplored = ucbs.reduce((prev, cur, i) => {
    if (isNaN(cur)) {
      prev.push(i)
    }
    return prev
  }, [])

  if (unexplored.length) {
    return unexplored[0]
  }

  return ucbs.indexOf(max(ucbs))
}

export let thompsonSampling = pulls => {
  let samples = pulls.map(ps => {
    let successes = ps.filter(Boolean).length
    let failures = ps.length - successes

    return randomBeta(1 + successes, 1 + failures)()
  })

  return samples.indexOf(max(samples))
}
