const swaggerJsdoc = require("swagger-jsdoc");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "API Teste Swagger",
			version: "1.0.0",
		},
		servers: [{ url: "http://localhost:8000" }],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
			schemas: {
				 schemas: {
					User: {
						type: "object",
						properties: {
							id: { type: "string" },
							name: { type: "string" },
							email: { type: "string" },
							role: { type: "string" },
							createdAt: { type: "string", format: "date-time" },
							updatedAt: { type: "string", format: "date-time" }
						}
					},
					UserCreate: {
						type: "object",
						required: ["name", "email", "password"],
						properties: {
							name: { type: "string" },
							email: { type: "string" },
							password: { type: "string", format: "password" }
						}
					},
					UserUpdate: {
						type: "object",
						properties: {
							name: { type: "string" },
							email: { type: "string" }
						}
					}
				}
			},
		},
	},
	apis: ["./routes/*.js", "./models/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
