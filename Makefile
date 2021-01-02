.PHONY: generate help

STATIC := src/static
IMGS := $(STATIC)/img

help:
	@python -c "$$PRINT_HELP_PYSCRIPT" < $(MAKEFILE_LIST)

generate:  ## generate all extra static files
	for 