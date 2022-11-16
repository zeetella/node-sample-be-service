/* tracing.js */

// Require dependencies
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const opentelemetry = require("@opentelemetry/api");
const { Resource } = require("@opentelemetry/resources");
const { SemanticResourceAttributes } = require("@opentelemetry/semantic-conventions");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { ConsoleSpanExporter, BatchSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { JaegerExporter } = require("@opentelemetry/exporter-jaeger");


/////Jaeger Exporter/////
const jaegerOptions = {
    tags: [], // optional
    // You can use the default UDPSender
    //host: 'localhost', // optional
    //port: 6832, // optional
    // OR you can use the HTTPSender as follows
    endpoint: 'http://localhost:14268/api/traces',
    maxPacketSize: 65000 // optional
}

const jaegerExporter = new JaegerExporter(jaegerOptions);

// This registers all instrumentation packages
registerInstrumentations({
  instrumentations: [
    getNodeAutoInstrumentations()
  ],
});

const resource =
  Resource.default().merge(
    new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: "training-sessions",
      [SemanticResourceAttributes.SERVICE_VERSION]: "1.0.0",
    })
  );

const provider = new NodeTracerProvider({
    resource: resource,
});
//const exporter = new ConsoleSpanExporter();
const processor = new BatchSpanProcessor(jaegerExporter);
provider.addSpanProcessor(processor);

provider.register();