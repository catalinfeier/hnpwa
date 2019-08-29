import { observable, action, extendObservable, computed } from "mobx";
import { fetchItem, fetchItems, fetchUser } from "./UtilityFunctions";
import { NewsItem, User, PageList } from "./Types";

export default class NewsStore {
  @observable isLoading: boolean = false;
  @observable requestCount: number = 0;
  @observable items: NewsItem[] = [];
  @observable users: User[] = [];
  @observable pages: PageList[] = [];

  @computed get page() {
    return (type: string, index: number) =>
      this.pages.find(page => page.type === type && page.index === index);
  }

  @action loadPage(type: string, index: number) {
    this.isLoading = true;
    this.requestCount++;
    fetchItems(type, index)
      .then(items => {
        const existingPage = this.pages.find(
          page => page.type === type && page.index === index
        );
        if (!existingPage) {
          this.pages.push({
            items: items,
            type,
            index
          });
        } else {
          existingPage.items = items;
        }
        if (--this.requestCount === 0) this.isLoading = false;
      })
      .catch(e => {
        if (--this.requestCount === 0) this.isLoading = false;
      });
  }

  @action
  loadItem(id: number) {
    this.isLoading = true;
    this.requestCount++;

    fetchItem(id)
      .then(item => {
        const existingItem = this.items.find(item => item.id === id);
        if (existingItem) {
          extendObservable(existingItem, item);
        } else {
          this.items.push(item);
        }
        if (--this.requestCount === 0) this.isLoading = false;
      })
      .catch(e => {
        if (--this.requestCount === 0) this.isLoading = false;
      });
  }

  @action
  loadUser(id: string) {
    this.isLoading = true;
    this.requestCount++;
    fetchUser(id)
      .then(user => {
        const existingUser = this.users.find(user => user.id === id);
        if (existingUser) {
          extendObservable(existingUser, user);
        } else {
          this.users.push(user);
        }

        if (--this.requestCount === 0) this.isLoading = false;
      })
      .catch(e => {
        if (--this.requestCount === 0) this.isLoading = false;
      });
  }
}
