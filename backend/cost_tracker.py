def calculate_cost(metrics):
    cost = (
        metrics["cpu"] * 0.02 +
        metrics["memory"] * 0.015 +
        metrics["storage"] * 0.01 +
        metrics["network"] * 0.005
    )
    return round(cost, 2)
