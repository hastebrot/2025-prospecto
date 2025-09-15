import { useState, type CSSProperties } from "react";
import { UiIcon } from "../../components/ui-icon";
import { classNames } from "../../helpers/clsx";
import { useDocumentTitle } from "../../helpers/react";

export const UiSalesOrdersPage = () => {
  useDocumentTitle("ui: sales orders");

  return (
    <Theme theme="light">
      <div
        className={classNames(
          "h-dvh overscroll-contain overflow-auto",
          "font-normal text-base",
          "bg-(--bg-base) text-(--fg-base) border-(--border-base)",
          "[scrollbar-color:var(--border-base)_var(--bg-base)]",
        )}
      >
        <div className="grid grid-cols-[auto_auto_1fr] h-full">
          <NavigationLayout />
          <CollectionLayout />
          <ItemLayout />
        </div>
      </div>
    </Theme>
  );
};

const NavigationLayout = () => {
  return (
    <div className="border-r border-(--border-base) bg-(--bg-layer) mr-4 flex flex-col gap-2 py-2">
      <NavItem name="workspace">Workspace</NavItem>
      <NavItem name="search">Search</NavItem>
      <NavItem>Finance</NavItem>
      <NavItem>Banking</NavItem>
      <NavItem>Payables</NavItem>
      <NavItem>Receivables</NavItem>
      <NavItem isSelected>Sales Orders</NavItem>
      <NavItem>Purchases</NavItem>
      <NavItem>Inventory</NavItem>
    </div>
  );
};

const NavItem = (props: { children?: React.ReactNode; isSelected?: boolean; name?: string }) => {
  return (
    <div
      className={classNames(
        props.isSelected && "bg-(--bg-accent)",
        "flex flex-col items-center gap-1 p-2",
      )}
    >
      {props.name === undefined && (
        <UiIcon name="circle" variant="outlined" height={22} strokeWidth={1.5 * (24 / 22)} />
      )}
      {props.name === "workspace" && (
        <UiIcon name="square" variant="outlined" height={22} strokeWidth={1.5 * (24 / 22)} />
      )}
      {props.name === "search" && (
        <UiIcon name="search" variant="outlined" height={22} strokeWidth={1.5 * (24 / 22)} />
      )}
      <div
        className={classNames(
          "font-semibold text-sm text-(--fg-subtle) text-wrap w-min text-center",
          props.isSelected && "!text-(--fg-base)",
        )}
      >
        {props.children}
      </div>
    </div>
  );
};

const CollectionLayout = () => {
  const [showFilterBox, setShowFilterBox] = useState<boolean>(false);
  const toggleFilterBox = () => {
    setShowFilterBox(!showFilterBox);
  };

  return (
    <div className="flex flex-col min-w-[260px]">
      <section className="p-4 pb-0 flex justify-between items-center">
        <div>
          <div className="text-lg">Sales Orders</div>
        </div>
        <div className="flex items-center -my-2 gap-2">
          <div className="grid">
            <UiIcon
              name="square"
              variant="outlined"
              height={18}
              strokeWidth={2}
              className="text-(--fg-subtle) row-1 col-1"
            />
            <UiIcon
              name="check"
              variant="outlined"
              height={12}
              strokeWidth={2 * (24 / 12)}
              className="text-(--fg-subtle) row-1 col-1 place-self-center"
            />
          </div>
          <div className="grid">
            <UiIcon
              name="circle"
              variant="outlined"
              height={18}
              strokeWidth={2}
              className="text-(--fg-subtle) row-1 col-1 place-self-center"
            />
            <UiIcon
              name="circle"
              variant="filled"
              height={8}
              strokeWidth={2}
              className="text-(--fg-subtle) row-1 col-1 place-self-center"
            />
          </div>
        </div>
      </section>

      <section className="px-4 pt-3.5 pb-3.5 flex justify-between gap-4">
        <div className="gap-2 flex items-center">
          <ToolbarButton hasIcon>
            <UiIcon name="reload" variant="outlined" height={18} strokeWidth={2} />
          </ToolbarButton>
          <ToolbarButton hasIcon onPress={toggleFilterBox} isSelected={showFilterBox}>
            <UiIcon name="filter" variant="outlined" height={18} strokeWidth={2} />
          </ToolbarButton>
          <ToolbarButton hasIcon>
            <UiIcon name="search" variant="outlined" height={18} strokeWidth={2} />
          </ToolbarButton>
          <ToolbarButton hasIcon>
            <UiIcon name="plus" variant="outlined" height={18} strokeWidth={2} />
          </ToolbarButton>
        </div>
      </section>

      <section className="h-full">
        <Viewport overflowY className="h-full">
          <div className="mx-4 border-t border-(--border-base)">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className={classNames(
                  "flex flex-col p-3 px-4 border-b border-(--border-base) even:bg-(--bg-layer)",
                  index === 2 && "bg-(--bg-accent)",
                )}
              >
                <div className="flex items-baseline justify-between">
                  <div className="font-semibold text-md text-(--fg-base)">Title title</div>
                  <div className="text-sm text-(--fg-subtle)">Label</div>
                </div>
                <div className="text-md text-(--fg-base)">Description</div>
                <div className="text-md text-(--fg-base)">Description description</div>
              </div>
            ))}
          </div>
        </Viewport>
      </section>
    </div>
  );
};

const ItemLayout = () => {
  const [showSummaryArea, setShowSummaryArea] = useState<boolean>(true);
  const toggleSummaryArea = () => {
    setShowSummaryArea(!showSummaryArea);
  };

  return (
    <div className="flex flex-col">
      <section className="p-4 pb-0 flex justify-between items-start">
        <div>
          <div className="text-sm text-(--fg-accent) mb-0.5 hidden">Sales Orders</div>
          <div className="text-lg flex items-center">
            SO 001253
            <TextSeparator />
            Agrilink Food
            <div className="ml-2 -my-2 flex items-center">
              <ToolbarButton hasIcon>
                <UiIcon name="star" variant="outlined" height={15} strokeWidth={2 * (18 / 15)} />
              </ToolbarButton>
              <ToolbarButton hasIcon>
                <div className="grid">
                  <UiIcon
                    name="star"
                    variant="filled"
                    height={15}
                    strokeWidth={2 * (18 / 15)}
                    className="row-1 col-1 text-(--bg-highlight)"
                  />
                  <UiIcon
                    name="star"
                    variant="outlined"
                    height={15}
                    strokeWidth={2 * (18 / 15)}
                    className="row-1 col-1"
                  />
                </div>
              </ToolbarButton>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <UiIcon name="message-2" variant="outlined" height={18} strokeWidth={2} />
            <span className="text-sm">Note</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="grid">
              <UiIcon
                name="file"
                variant="filled"
                height={18}
                strokeWidth={2}
                className="row-1 col-1 text-(--bg-highlight)"
              />
              <UiIcon
                name="file"
                variant="outlined"
                height={18}
                strokeWidth={2}
                className="row-1 col-1"
              />
            </div>
            <span className="text-sm">Files (2)</span>
          </div>
          <div className="flex items-center gap-1">
            <UiIcon name="lifebuoy" variant="outlined" height={18} strokeWidth={2} />
            <span className="text-sm">Help</span>
          </div>
          <div className="flex items-center gap-1">
            <UiIcon name="settings" variant="outlined" height={18} strokeWidth={2} />
            <UiIcon
              name="chevron-down"
              variant="outlined"
              height={14}
              strokeWidth={2 * (18 / 14)}
            />
          </div>
        </div>
      </section>

      <section className="p-4 pt-3.5 pb-3.5 flex justify-between gap-4">
        <div className="gap-2 flex items-center">
          <ToolbarButton hasIcon>
            <UiIcon name="corner-up-left" variant="outlined" height={18} strokeWidth={2} />
          </ToolbarButton>
          <ToolbarButton hasIcon isDisabled>
            <UiIcon name="device-floppy" variant="outlined" height={18} strokeWidth={2} />
          </ToolbarButton>
          <ToolbarButton hasIcon isDisabled>
            <UiIcon name="u-turn-left" variant="outlined" height={18} strokeWidth={2} />
          </ToolbarButton>
          <ToolbarButton hasIcon>
            <UiIcon name="plus" variant="outlined" height={18} strokeWidth={2} />
          </ToolbarButton>
          <ToolbarButton hasIcon isDisabled>
            <UiIcon name="trash" variant="outlined" height={18} strokeWidth={2} />
          </ToolbarButton>
          <ToolbarButton hasIcon>
            <UiIcon name="clipboard-text" variant="outlined" height={18} strokeWidth={2} />
            <UiIcon
              name="chevron-down"
              variant="outlined"
              height={14}
              strokeWidth={2 * (18 / 14)}
            />
          </ToolbarButton>
          {/*
            <ToolbarButton hasIcon>
              <CtoIcon name="chevron-left-pipe" variant="outlined" height={18} strokeWidth={2} />
            </ToolbarButton>
            <ToolbarButton hasIcon>
              <CtoIcon name="chevron-left" variant="outlined" height={18} strokeWidth={2} />
            </ToolbarButton>
            <ToolbarButton hasIcon>
              <CtoIcon name="chevron-right" variant="outlined" height={18} strokeWidth={2} />
            </ToolbarButton>
            <ToolbarButton hasIcon>
              <CtoIcon name="chevron-right-pipe" variant="outlined" height={18} strokeWidth={2} />
            </ToolbarButton>
            */}
          <ToolbarButton color="green">Complete</ToolbarButton>
          <ToolbarButton hasIcon>
            <UiIcon name="dots" variant="outlined" height={18} strokeWidth={2} />
          </ToolbarButton>
        </div>
        <div className="flex gap-1">
          <ToolbarButton onPress={toggleSummaryArea} isSelected={!showSummaryArea}>
            <UiIcon
              name="chevron-up"
              variant="outlined"
              height={18}
              strokeWidth={2}
              className={classNames(!showSummaryArea && "rotate-180")}
            />
          </ToolbarButton>
        </div>
      </section>

      <section
        className={classNames(
          "grid grid-flow-col auto-cols-[minmax(min-content,_1fr)] p-4 py-0 pb-4 gap-4",
          !showSummaryArea && "hidden",
        )}
      >
        <div className="p-4 rounded-lg border border-(--border-base) bg-(--bg-layer)">
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5">
            <FormLabel>Order Type</FormLabel>
            <FormControl isSearchField>
              SO
              <UiIcon
                name="search"
                variant="outlined"
                height={16}
                strokeWidth={2}
                className="text-(--fg-subtle)"
              />
            </FormControl>
            <FormLabel decoration="warning">
              <div className="w-full flex justify-between items-center gap-1">
                Order Nbr.
                <UiIcon
                  name="alert-triangle"
                  variant="outlined"
                  height={15}
                  strokeWidth={2 * (18 / 15)}
                  className="text-(--fg-highlight)"
                />
              </div>
            </FormLabel>
            <FormControl isSearchField decorateAs="warning">
              001253
              <UiIcon
                name="search"
                variant="outlined"
                height={16}
                strokeWidth={2}
                className="text-(--fg-subtle)"
              />
            </FormControl>
            <FormLabel>Status</FormLabel>
            <FormControl isReadOnlyField>
              <div className="-ml-2">
                <Badge color="green">Completed</Badge>
              </div>
            </FormControl>
            <FormLabel>Date</FormLabel>
            <FormControl isReadOnlyField>05 Feb 2013</FormControl>
            <FormLabel>Requested On</FormLabel>
            <FormControl isReadOnlyField>05 Feb 2013</FormControl>
            <FormLabel>Customer Order Nbr.</FormLabel>
            <FormControl isReadOnlyField></FormControl>
            <FormLabel>External Reference</FormLabel>
            <FormControl isReadOnlyField></FormControl>
          </div>
        </div>
        <div className="p-4 rounded-lg border border-(--border-base) bg-(--bg-layer)">
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5">
            <FormLabel>Customer</FormLabel>
            <FormControl isReadOnlyField>
              <TextLink>FDIAGRI</TextLink>
              <TextSeparator />
              Agrilink Food
            </FormControl>
            <FormLabel>Location</FormLabel>
            <FormControl isReadOnlyField>
              <TextLink>MAIN</TextLink>
              <TextSeparator />
              Primary Location
            </FormControl>
            <FormLabel>Contact</FormLabel>
            <FormControl isReadOnlyField></FormControl>
            <FormLabel>Currency</FormLabel>
            <FormControl isReadOnlyField>USD</FormControl>
            <FormLabel>Project</FormLabel>
            <FormControl isReadOnlyField>
              <TextLink>X</TextLink>
              <TextSeparator />
              Non-Project Code
            </FormControl>
            <FormLabel>Description</FormLabel>
            <FormControl isReadOnlyField>Food Order</FormControl>
          </div>
        </div>
        <div className="p-4 rounded-lg border border-(--border-base) bg-(--bg-layer)">
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5">
            <FormLabel>Ordered Qty.</FormLabel>
            <FormControl isReadOnlyField textAlign="right">
              355.00
            </FormControl>
            <FormLabel>Detail Total</FormLabel>
            <FormControl isReadOnlyField textAlign="right">
              10,006.50
            </FormControl>
            <FormLabel>Freight Total</FormLabel>
            <FormControl isReadOnlyField textAlign="right">
              0.00
            </FormControl>
            <FormLabel>Line Discounts</FormLabel>
            <FormControl isReadOnlyField textAlign="right">
              0.00
            </FormControl>
            <FormLabel>Document Discounts</FormLabel>
            <FormControl isReadOnlyField textAlign="right">
              0.00
            </FormControl>
            <FormLabel>Tax Total</FormLabel>
            <FormControl isReadOnlyField textAlign="right">
              0.00
            </FormControl>
            <FormLabel>Order Total</FormLabel>
            <FormControl isReadOnlyField textAlign="right">
              10,006.50
            </FormControl>
          </div>
        </div>
      </section>

      <section className="p-4 py-0">
        <div className="relative flex items-center gap-6 px-0">
          <div className="absolute left-0 right-0 bottom-0 h-[1px] bg-(--border-base) pointer-events-none"></div>
          {/* <div className="absolute left-0 top-0 bottom-0 -ml-1 w-1 bg-(--border-highlight) pointer-events-none"></div> */}

          <div className="relative py-2 uppercase text-(--fg-accent)">
            <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-(--fg-accent) pointer-events-none"></div>
            Details
          </div>

          <div className="relative py-2 uppercase text-(--fg-highlight) flex items-center gap-1">
            <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-(--fg-highlight) pointer-events-none"></div>
            <UiIcon
              name="alert-triangle"
              variant="outlined"
              height={15}
              strokeWidth={2 * (18 / 15)}
            />
            Totals
          </div>

          <div className="py-2 uppercase">Financial</div>
          <div className="py-2 uppercase">Shipping</div>
          <div className="py-2 uppercase">Addresses</div>
          <div className="py-2 uppercase">Payments</div>
          <div className="py-2 uppercase">Shipments</div>
          <div className="py-2 uppercase">Risks</div>
          <div className="py-2 uppercase">Discounts</div>
          {/* <div className="py-2 uppercase">Commissions</div> */}
          {/* <div className="py-2 uppercase">Relations</div> */}
          <div className="flex items-center">
            <UiIcon name="dots" variant="outlined" height={18} strokeWidth={2} />
          </div>
        </div>
      </section>

      <section className="p-4 pt-4 pb-4 flex justify-between gap-4">
        <div className="gap-2 flex items-center">
          <ToolbarButton hasIcon>
            <UiIcon name="reload" variant="outlined" height={18} strokeWidth={2} />
          </ToolbarButton>
          <ToolbarButton isDisabled>Add Items</ToolbarButton>
          <ToolbarButton isDisabled>Add Matrix Items</ToolbarButton>
          <ToolbarButton isDisabled>Add Invoice</ToolbarButton>
          <ToolbarButton>Line Details</ToolbarButton>
          <ToolbarButton>Item Availability</ToolbarButton>
          <ToolbarButton isDisabled>Configure</ToolbarButton>
        </div>
        <div className="h-[28px] flex items-center gap-4">
          <div className="h-[28px] flex items-center justify-between px-2 gap-2 bg-(--bg-base) border border-(--border-base) rounded-md">
            <span className="text-base italic min-w-[100px]">Search</span>
            <UiIcon
              name="search"
              variant="outlined"
              height={16}
              strokeWidth={2}
              className="text-(--fg-subtle)"
            />
          </div>
        </div>
      </section>

      <section className="p-4 py-0 h-full">
        <Viewport overflowX className="h-full">
          <div>
            <Table>
              <TableHeader>
                <TableColumn>
                  <UiIcon name="message-2" variant="outlined" height={18} strokeWidth={2} />
                </TableColumn>
                <TableColumn>
                  <UiIcon name="file" variant="outlined" height={18} strokeWidth={2} />
                </TableColumn>
                <TableColumn>Configuration</TableColumn>
                <TableColumn>Branch</TableColumn>
                <TableColumn>Inventory ID</TableColumn>
                <TableColumn>Free Item</TableColumn>
                <TableColumn>Warehouse</TableColumn>
                <TableColumn>Line Description</TableColumn>
                <TableColumn>UOM</TableColumn>
                <TableColumn textAlign="right">Quantity</TableColumn>
                <TableColumn textAlign="right">Qty. On Shipments</TableColumn>
                <TableColumn textAlign="right">Open Qty.</TableColumn>
                <TableColumn textAlign="right">Unit Cost</TableColumn>
                <TableColumn textAlign="right">Unit Price</TableColumn>
                <TableColumn>Manual Price</TableColumn>
              </TableHeader>
              <TableRow>
                <TableCell noPadding>
                  <div className="grid">
                    <UiIcon
                      name="message-2"
                      variant="filled"
                      height={18}
                      strokeWidth={2}
                      className="row-1 col-1 text-(--bg-highlight)"
                    />
                    <UiIcon
                      name="message-2"
                      variant="outlined"
                      height={18}
                      strokeWidth={2}
                      className="row-1 col-1"
                    />
                  </div>
                </TableCell>
                <TableCell noPadding>
                  <div className="grid">
                    <UiIcon
                      name="file"
                      variant="filled"
                      height={18}
                      strokeWidth={2}
                      className="row-1 col-1 text-(--bg-highlight)"
                    />
                    <UiIcon
                      name="file"
                      variant="outlined"
                      height={18}
                      strokeWidth={2}
                      className="row-1 col-1"
                    />
                  </div>
                </TableCell>
                <TableCell noPadding>
                  <UiIcon
                    name="square"
                    variant="outlined"
                    height={18}
                    strokeWidth={2}
                    className="text-(--fg-muted)"
                  />
                </TableCell>
                <TableCell>PRODWHOLE</TableCell>
                <TableCell>
                  <span className="text-(--fg-accent) hover:underline">FOODBREAD</span>
                </TableCell>
                <TableCell noPadding>
                  <UiIcon
                    name="square"
                    variant="outlined"
                    height={18}
                    strokeWidth={2}
                    className="text-(--fg-muted)"
                  />
                </TableCell>
                <TableCell>RETAIL</TableCell>
                <TableCell>Hot Dog Buns 8 PK (12per pack)</TableCell>
                <TableCell>EA</TableCell>
                <TableCell textAlign="right">50.00</TableCell>
                <TableCell textAlign="right">50.00</TableCell>
                <TableCell textAlign="right">0.00</TableCell>
                <TableCell textAlign="right">0.00</TableCell>
                <TableCell textAlign="right">34.65</TableCell>
                <TableCell noPadding>
                  <UiIcon
                    name="square"
                    variant="outlined"
                    height={18}
                    strokeWidth={2}
                    className="text-(--fg-muted)"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell noPadding>
                  <UiIcon name="message-2" variant="outlined" height={18} strokeWidth={2} />
                </TableCell>
                <TableCell noPadding>
                  <UiIcon name="file" variant="outlined" height={18} strokeWidth={2} />
                </TableCell>
                <TableCell noPadding>
                  <UiIcon
                    name="square"
                    variant="outlined"
                    height={18}
                    strokeWidth={2}
                    className="text-(--fg-muted)"
                  />
                </TableCell>
                <TableCell>PRODWHOLE</TableCell>
                <TableCell>
                  <TextLink>FOODSUGAR</TextLink>
                </TableCell>
                <TableCell noPadding>
                  <UiIcon
                    name="square"
                    variant="outlined"
                    height={18}
                    strokeWidth={2}
                    className="text-(--fg-muted)"
                  />
                </TableCell>
                <TableCell>RETAIL</TableCell>
                <TableCell>Sweet N Low Sugar 12pk</TableCell>
                <TableCell>EA</TableCell>
                <TableCell textAlign="right">25.00</TableCell>
                <TableCell textAlign="right">25.00</TableCell>
                <TableCell textAlign="right">0.00</TableCell>
                <TableCell textAlign="right">0.00</TableCell>
                <TableCell textAlign="right">55.42</TableCell>
                <TableCell noPadding>
                  <UiIcon
                    name="square"
                    variant="outlined"
                    height={18}
                    strokeWidth={2}
                    className="text-(--fg-muted)"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell noPadding>
                  <UiIcon name="message-2" variant="outlined" height={18} strokeWidth={2} />
                </TableCell>
                <TableCell noPadding>
                  <UiIcon name="file" variant="outlined" height={18} strokeWidth={2} />
                </TableCell>
                <TableCell noPadding>
                  <UiIcon
                    name="square"
                    variant="outlined"
                    height={18}
                    strokeWidth={2}
                    className="text-(--fg-muted)"
                  />
                </TableCell>
                <TableCell>PRODWHOLE</TableCell>
                <TableCell>
                  <TextLink>FOODKCOF35</TextLink>
                </TableCell>
                <TableCell noPadding>
                  <UiIcon
                    name="square"
                    variant="outlined"
                    height={18}
                    strokeWidth={2}
                    className="text-(--fg-muted)"
                  />
                </TableCell>
                <TableCell>RETAIL</TableCell>
                <TableCell>Coffee K-Cup Sampler Coffee 35 Count</TableCell>
                <TableCell>EA</TableCell>
                <TableCell textAlign="right">100.00</TableCell>
                <TableCell textAlign="right">100.00</TableCell>
                <TableCell textAlign="right">0.00</TableCell>
                <TableCell textAlign="right">0.00</TableCell>
                <TableCell textAlign="right">22.95</TableCell>
                <TableCell noPadding>
                  <UiIcon
                    name="square"
                    variant="outlined"
                    height={18}
                    strokeWidth={2}
                    className="text-(--fg-muted)"
                  />
                </TableCell>
              </TableRow>
              <TableRow decorateAs="warning">
                <TableCell noPadding>
                  <UiIcon name="message-2" variant="outlined" height={18} strokeWidth={2} />
                </TableCell>
                <TableCell noPadding>
                  <UiIcon name="file" variant="outlined" height={18} strokeWidth={2} />
                </TableCell>
                <TableCell noPadding>
                  <UiIcon
                    name="square"
                    variant="outlined"
                    height={18}
                    strokeWidth={2}
                    className="text-(--fg-muted)"
                  />
                </TableCell>
                <TableCell>PRODWHOLE</TableCell>
                <TableCell>
                  <TextLink>FOODTEA06</TextLink>
                </TableCell>
                <TableCell noPadding>
                  <UiIcon
                    name="square"
                    variant="outlined"
                    height={18}
                    strokeWidth={2}
                    className="text-(--fg-muted)"
                  />
                </TableCell>
                <TableCell>RETAIL</TableCell>
                <TableCell>Liptons Cold Brew Tea Bags 6 Pack</TableCell>
                <TableCell>EA</TableCell>
                <TableCell textAlign="right">
                  <div className="w-full gap-2 flex items-center justify-between text-(--fg-highlight)">
                    <UiIcon
                      name="alert-triangle"
                      variant="outlined"
                      height={15}
                      strokeWidth={2 * (18 / 15)}
                      className="text-(--fg-highlight)"
                    />
                    <span className="text-right">50.00</span>
                  </div>
                </TableCell>
                <TableCell textAlign="right">50.00</TableCell>
                <TableCell textAlign="right">0.00</TableCell>
                <TableCell textAlign="right">0.00</TableCell>
                <TableCell textAlign="right">24.88</TableCell>
                <TableCell noPadding>
                  <UiIcon
                    name="square"
                    variant="outlined"
                    height={18}
                    strokeWidth={2}
                    className="text-(--fg-muted)"
                  />
                </TableCell>
              </TableRow>
            </Table>
          </div>
        </Viewport>
      </section>

      <section className="p-4 pt-4 pb-4 flex justify-end gap-4">
        <div className="flex items-center gap-2.5">
          <ToolbarButton>
            <UiIcon name="chevron-left-pipe" variant="outlined" height={18} strokeWidth={2} />
          </ToolbarButton>
          <ToolbarButton>
            <UiIcon name="chevron-left" variant="outlined" height={18} strokeWidth={2} />
          </ToolbarButton>
          <ToolbarButton>
            <UiIcon name="chevron-right" variant="outlined" height={18} strokeWidth={2} />
          </ToolbarButton>
          <ToolbarButton>
            <UiIcon name="chevron-right-pipe" variant="outlined" height={18} strokeWidth={2} />
          </ToolbarButton>
        </div>
      </section>
    </div>
  );
};

export const Badge = (props: { children?: React.ReactNode; color?: string }) => {
  return (
    <div
      className={classNames(
        "h-[24px] inline-flex items-center px-2 rounded-md",
        props.color === "green" && "bg-green-200 saturate-50",
        props.color === "yellow" && "bg-yellow-200 saturate-50",
        props.color === "red" && "bg-red-200 saturate-50",
        props.color === "blue" && "bg-blue-200 saturate-50",
      )}
    >
      {props.children}
    </div>
  );
};

export const ToolbarButton = (props: {
  children?: React.ReactNode;
  hasIcon?: boolean;
  isDisabled?: boolean;
  color?: string;
  onPress?: () => void;
  isSelected?: boolean;
}) => {
  return (
    <button
      type="button"
      className={classNames(
        "h-[28px] flex items-center gap-1 px-2 rounded-md text-nowrap select-none",
        !props.hasIcon && "bg-(--bg-layer)",
        props.isDisabled && "text-(--fg-muted) cursor-default",
        !props.isDisabled && "text-(--fg-base) hover:bg-(--bg-layer-active) cursor-pointer",
        !props.isDisabled && props.isSelected && "!bg-(--bg-accent) hover:!brightness-85",
        props.color === "green" && "!bg-green-200 hover:brightness-85 saturate-50",
        props.color === "yellow" && "!bg-yellow-200 hover:brightness-85  saturate-50",
        props.color === "red" && "!bg-red-200 hover:brightness-85 saturate-50",
        props.color === "blue" && "!bg-blue-200 hover:brightness-85 saturate-50",
      )}
      onClick={props.onPress}
      disabled={props.isDisabled}
    >
      {props.children}
    </button>
  );
};

export const TextSeparator = () => {
  return <span className="whitespace-pre"> - </span>;
};

export const TextLink = (props: { children?: React.ReactNode }) => {
  return <div className="text-(--fg-accent) hover:underline">{props.children}</div>;
};

export const FormLabel = (props: { children?: React.ReactNode; decoration?: string }) => {
  return (
    <div
      className={classNames(
        props.decoration && [
          "bg-(--bg-highlight) rounded-l-md",
          "-my-px py-px",
          "-ml-2 pl-2",
          "-mr-2.5 pr-2.5",
        ],
      )}
    >
      <div
        className={classNames(
          // "font-semibold text-sm text-(--fg-subtle)",
          "h-[30px] flex items-center text-nowrap",
        )}
      >
        {props.children}
      </div>
    </div>
  );
};

export const FormControl = ({
  ...props
}: {
  children?: React.ReactNode;
  isSearchField?: boolean;
  isReadOnlyField?: boolean;
  textAlign?: "left" | "right";
  decorateAs?: string;
}) => {
  props.textAlign = props.textAlign ?? "left";

  return (
    <div
      className={classNames(
        props.decorateAs && [
          "bg-(--bg-highlight) rounded-r-md",
          "-my-px py-px",
          "-ml-2.5 pl-2.5",
          "-mr-px pr-px",
        ],
      )}
    >
      <div
        tabIndex={-1}
        className={classNames(
          "h-[30px] flex items-center px-2 cursor-text text-nowrap",
          props.isReadOnlyField && "border-b border-(--border-base) brightness-95",
          props.isSearchField &&
            "!justify-between bg-(--bg-base) border border-(--border-base) rounded-md",
          props.textAlign === "left" && "text-left justify-start",
          props.textAlign === "right" && "text-right justify-end",
          props.decorateAs && "outline-(--border-highlight) outline-2 -outline-offset-1",
          props.isSearchField &&
            "focus:outline-(--fg-accent) focus:outline-2 focus:-outline-offset-1",
        )}
      >
        {props.children}
      </div>
    </div>
  );
};

export const Table = (props: { children?: React.ReactNode }) => {
  return <table>{props.children}</table>;
};

export const TableHeader = (props: { children?: React.ReactNode }) => {
  return (
    <thead>
      <tr>{props.children}</tr>
    </thead>
  );
};

export const TableColumn = ({
  ...props
}: {
  children?: React.ReactNode;
  textAlign?: "left" | "right";
}) => {
  props.textAlign = props.textAlign ?? "left";
  return (
    <th
      className={classNames(
        "p-1.5 pb-4 text-sm text-left align-top",
        "first:pl-2",
        "text-(--fg-subtle) bg-(--bg-layer) border-y not-last:border-r border-(--border-base)",
        props.textAlign === "left" && "pr-4 text-left",
        props.textAlign === "right" && "pl-4 text-right",
      )}
    >
      {props.children}
    </th>
  );
};

export const TableBody = (props: { children?: React.ReactNode }) => {
  return <tbody>{props.children}</tbody>;
};

export const TableRow = (props: { children?: React.ReactNode; decorateAs?: string }) => {
  return (
    <tr
      tabIndex={-1}
      className={classNames(
        "relative cursor-pointer odd:bg-(--bg-layer)",
        "focus:bg-(--bg-accent)",
        props.decorateAs && [
          "after:absolute after:left-0 after:top-0 after:h-full after:w-1",
          "after:bg-(--border-highlight)",
          "after:pointer-events-none",
        ],
      )}
    >
      {props.children}
    </tr>
  );
};

export const TableCell = ({
  ...props
}: {
  children?: React.ReactNode;
  textAlign?: "left" | "right";
  noPadding?: boolean;
}) => {
  props.textAlign = props.textAlign ?? "left";
  return (
    <td
      className={classNames(
        "relative p-1.5 py-2 text-left align-top text-nowrap",
        "first:pl-2 last:w-full",
        "border-y border-(--border-base)",
        props.textAlign === "left" && "pr-4 text-left",
        props.textAlign === "right" && "pl-4 text-right",
        props.noPadding && "pb-0",
      )}
    >
      {props.children}
    </td>
  );
};

export const Theme = (props: { children?: React.ReactNode; theme: "light" | "dark" }) => {
  const style = {
    "--color-zinc-350": "color-mix(in oklch, var(--color-zinc-300), var(--color-zinc-400))",
  } as CSSProperties;
  const lightMode = {
    "--bg-base": "var(--color-white)",
    "--bg-layer": "var(--color-zinc-100)",
    "--bg-layer-active": "var(--color-zinc-200)",
    "--fg-base": "var(--color-zinc-900)",
    "--fg-subtle": "var(--color-zinc-500)",
    "--fg-muted": "var(--color-zinc-350)",
    "--border-base": "var(--color-zinc-200)",
    "--border-active": "var(--color-zinc-300)",
    "--fg-accent": "var(--color-blue-500)",
    "--bg-accent": "var(--color-blue-100)",
    "--border-accent": "var(--color-blue-200)",
    "--fg-highlight": "var(--color-amber-600)",
    "--bg-highlight": "var(--color-amber-200)",
    "--border-highlight": "var(--color-amber-400)",
  } as CSSProperties;
  const darkMode = {
    "--bg-base": "var(--color-neutral-900)",
    "--bg-layer": "var(--color-neutral-800)",
    "--bg-layer-active": "var(--color-neutral-700)",
    "--fg-base": "var(--color-neutral-100)",
    "--fg-subtle": "var(--color-neutral-300)",
    "--fg-muted": "var(--color-neutral-500)",
    "--border-base": "var(--color-neutral-700)",
    "--border-active": "var(--color-neutral-600)",
    "--fg-accent": "var(--color-sky-300)",
    "--bg-accent": "var(--color-slate-700)",
    "--border-accent": "var(--color-slate-500)",
    "--fg-highlight": "var(--color-yellow-300)",
    "--bg-highlight": "var(--color-yellow-300)",
    "--border-highlight": "var(--color-yellow-400)",
  } as CSSProperties;
  return (
    <div
      className="font-sans font-normal text-base grid"
      style={{ ...style, ...(props.theme === "light" ? lightMode : darkMode) }}
      data-theme={props.theme}
    >
      {props.children}
    </div>
  );
};

export type ViewportProps = {
  className?: string;
  children?: React.ReactNode;
  overflowX?: boolean;
  overflowY?: boolean;
};

export const Viewport = (props: ViewportProps) => {
  return (
    <div
      className={classNames(
        props.className,
        "grid relative",
        props.overflowX && "overflow-x-auto",
        props.overflowY && "overflow-y-auto",
      )}
    >
      <div className="grid absolute inset-0">{props.children}</div>
    </div>
  );
};
