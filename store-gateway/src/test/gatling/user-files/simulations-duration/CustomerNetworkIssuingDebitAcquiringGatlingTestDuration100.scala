import _root_.io.gatling.core.scenario.Simulation
import ch.qos.logback.classic.{Level, LoggerContext}
import io.gatling.core.Predef._
import io.gatling.http.Predef._
import org.slf4j.LoggerFactory

import scala.concurrent.duration._

/**
 * Performance test for the Customer entity.
 */
class CustomerGatlingTestDuration100 extends Simulation {

    val context: LoggerContext = LoggerFactory.getILoggerFactory.asInstanceOf[LoggerContext]
    // Log all HTTP requests
    //context.getLogger("io.gatling.http").setLevel(Level.valueOf("TRACE"))
    // Log failed HTTP requests
    //context.getLogger("io.gatling.http").setLevel(Level.valueOf("DEBUG"))

    val baseURL = Option(System.getProperty("baseURL")) getOrElse """http://localhost:8080"""

    val httpConf = http
        .baseURL(baseURL)
        .inferHtmlResources()
        .acceptHeader("*/*")
        .acceptEncodingHeader("gzip, deflate")
        .acceptLanguageHeader("fr,fr-fr;q=0.8,en-us;q=0.5,en;q=0.3")
        .connectionHeader("keep-alive")
        .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:33.0) Gecko/20100101 Firefox/33.0")

    val headers_http = Map(
        "Accept" -> """application/json"""
    )

    val headers_http_authentication = Map(
        "Content-Type" -> """application/json""",
        "Accept" -> """application/json"""
    )

    val headers_http_authenticated = Map(
        "Accept" -> """application/json""",
        "Authorization" -> "${access_token}"
    )

    val scn = scenario("Test the Customer entity").during(2 minutes) {
        .exec(http("First unauthenticated request")
        .get("/api/account")
        .headers(headers_http)
        .check(status.is(401))).exitHereIfFailed
        .pause(10)
        .exec(http("Authentication")
        .post("/api/authenticate")
        .headers(headers_http_authentication)
        .body(StringBody("""{"username":"admin", "password":"admin"}""")).asJSON        .check(header.get("Authorization").saveAs("access_token"))).exitHereIfFailed        .pause(1)
        .exec(http("Authenticated request")
        .get("/api/account")
        .headers(headers_http_authenticated)
        .check(status.is(200)))
        .pause(10)
        .repeat(2) {
            exec(http("Get all customers")
            .get("/customer/api/customers")
            .headers(headers_http_authenticated)
            .check(status.is(200)))
            .pause(10 seconds, 20 seconds)
						.exec(http("Get all networks")
            .get("/bank/api/networks")
            .headers(headers_http_authenticated)
            .check(status.is(200)))
            .pause(10 seconds, 20 seconds)
            .exec(http("Create new customer")
            .post("/customer/api/customers")
            .headers(headers_http_authenticated)
            .body(StringBody("""{"id":null, "firstName":"SAMPLE_TEXT", "lastName":"SAMPLE_TEXT", "address":"SAMPLE_TEXT"}""")).asJSON
            .check(status.is(201))
            .check(headerRegex("Location", "(.*)").saveAs("new_customer_url"))
						.check(jsonPath("$..id").find.saveAs("customer_id"))
						).exitHereIfFailed
            .exec(http("Create new network")
            .post("/bank/api/networks")
            .headers(headers_http_authenticated)
            .body(StringBody("""{"id":null, "name":"SAMPLE_TEXT"}""")).asJSON
            .check(status.is(201))
            .check(headerRegex("Location", "(.*)").saveAs("new_network_url"))
						.check(jsonPath("$..id").find.saveAs("network_id"))
						).exitHereIfFailed
            .exec(http("Create new issuingBank")
            .post("/bank/api/issuing-banks")
            .headers(headers_http_authenticated)
            .body(StringBody("""{"id":null, "name":"SAMPLE_TEXT", "address":"SAMPLE_TEXT", "network": {"id":"${network_id}", "name":"SAMPLE_TEXT"}}""")).asJSON
            .check(status.is(201))
            .check(headerRegex("Location", "(.*)").saveAs("new_issuingBank_url"))
						.check(jsonPath("$..id").find.saveAs("issuingbank_id"))
						).exitHereIfFailed
            .exec(http("Create new debit")
            .post("/bank/api/debits")
            .headers(headers_http_authenticated)
            .body(StringBody("""{"id":null, "pin":"0", "cardNumber":"0", "validityDate":"2020-01-01T00:00:00.000Z", "network": {"id":"${network_id}", "name":"SAMPLE_TEXT"}, "customer_id":"${customer_id}"}""")).asJSON
            .check(status.is(201))
            .check(headerRegex("Location", "(.*)").saveAs("new_debit_url"))
						.check(jsonPath("$..id").find.saveAs("debit_id"))
						).exitHereIfFailed						
            .exec(http("Create new acquiringBank")
            .post("/bank/api/acquiring-banks")
            .headers(headers_http_authenticated)
            .body(StringBody("""{"id":null, "name":"SAMPLE_TEXT", "address":"SAMPLE_TEXT", "network": {"id":"${network_id}", "name":"SAMPLE_TEXT"}}""")).asJSON
            .check(status.is(201))
            .check(headerRegex("Location", "(.*)").saveAs("new_acquiringBank_url"))
						.check(jsonPath("$..id").find.saveAs("acquiringbank_id"))
						).exitHereIfFailed
            .pause(10)
            .repeat(5) {
                exec(http("Get created debit")
                .get("/bank${new_debit_url}")
                .headers(headers_http_authenticated))
                .pause(10)
            }
            .exec(http("Delete created debit")
            .delete("/bank${new_debit_url}")
            .headers(headers_http_authenticated))						
            .pause(10)
            .repeat(5) {
                exec(http("Get created acquiringBank")
                .get("/bank${new_acquiringBank_url}")
                .headers(headers_http_authenticated))
                .pause(10)
            }
            .exec(http("Delete created acquiringBank")
            .delete("/bank${new_acquiringBank_url}")
            .headers(headers_http_authenticated))
            .pause(10)
            .repeat(5) {
                exec(http("Get created issuingBank")
                .get("/bank${new_issuingBank_url}")
                .headers(headers_http_authenticated))
                .pause(10)
            }
            .exec(http("Delete created issuingBank")
            .delete("/bank${new_issuingBank_url}")
            .headers(headers_http_authenticated))						
            .pause(10)
            .repeat(5) {
                exec(http("Get created network")
                .get("/bank${new_network_url}")
                .headers(headers_http_authenticated))
                .pause(10)
            }
            .exec(http("Delete created network")
            .delete("/bank${new_network_url}")
            .headers(headers_http_authenticated))
            .pause(10)						
            .repeat(5) {
                exec(http("Get created customer")
                .get("/customer${new_customer_url}")
                .headers(headers_http_authenticated))
                .pause(10)
            }
            .exec(http("Delete created customer")
            .delete("/customer${new_customer_url}")
            .headers(headers_http_authenticated))
            .pause(10)
        }
		}
		
    val users = scenario("Users").exec(scn)

    setUp(
        users.inject(rampUsers(100) over (1 minutes))
    ).protocols(httpConf)
}
